<script lang="ts">
	import { base } from '$app/paths';
	import Button from '$/components/Button.svelte';
	import Input from '$/components/Input.svelte';
	import { onMount } from 'svelte';
	import Select from '$/components/Select.svelte';
	import { platforms } from '$lib/platform';
	import { saveLinks, type Link, loadLinks, linksStore } from '$lib/service';

	export let data;

	const { user } = data;

	type OrderableLink = Partial<Link> & { originalIndex: number };

	let clientY = 0;
	let touchDrag = false;

	let links: OrderableLink[] = [];
	let draggedLink: OrderableLink | null;
	let saving = false;

	linksStore.subscribe((value) => {
		links = value.map((link, i) => ({
			...link,
			originalIndex: i
		}));
	});

	function renumberLinks() {
		links.forEach((link, i) => {
			link.originalIndex = i;
		});
		links = [...links];
	}

	function onAddLink() {
		links = [
			...links,
			{
				id: Date.now().toString(36),
				originalIndex: links.length
			}
		];

		requestAnimationFrame(() => {
			const lastLi = document.querySelector('.links-container > ul > li:last-child');
			lastLi?.scrollIntoView({ behavior: 'smooth' });
		});
	}

	function onRemoveLink(link: OrderableLink) {
		links = links.filter((l) => l !== link);
		renumberLinks();
	}

	async function onSave() {
		console.log('Saving links', links);
		const validLinks: Link[] = links
			.map(({ id, platform, url }) =>
				id && platform && url
					? {
							id,
							platform,
							url
						}
					: undefined
			)
			.filter((link): link is Link => !!link);

		saving = true;
		try {
			await saveLinks(user.uid, validLinks);
			linksStore.set(validLinks);
		} catch (error) {
			console.error(error);
		} finally {
			saving = false;
		}
	}

	function swapLinks(link1: OrderableLink, link2: OrderableLink) {
		const index1 = links.indexOf(link1);
		const index2 = links.indexOf(link2);
		if (index1 === -1 || index2 === -1) return;
		[links[index1], links[index2]] = [links[index2], links[index1]];
		links = [...links];
	}

	function onDragOver(event: DragEvent) {
		event.preventDefault();

		// for drag-scrolling
		clientY = event.clientY;

		const target = event.target as HTMLElement;
		const li = target.closest('li');
		const targetLink = li && links.find((l) => l.id === li.dataset.linkId);

		if (!targetLink || !draggedLink || targetLink?.id === draggedLink?.id) return;
		swapLinks(draggedLink, targetLink);
	}

	function onDragEnd(event: DragEvent) {
		draggedLink = null;
		renumberLinks();
	}

	function onTouchDragStart(event: TouchEvent, link: OrderableLink) {
		event.preventDefault();
		clientY = event.touches[0].clientY;
		touchDrag = true;
		draggedLink = link;
		requestAnimationFrame(dragAndDropScroll);
	}

	function onTouchDragMove(event: TouchEvent) {
		if (!draggedLink) return;
		clientY = event.touches[0].clientY;

		const overElement = document.elementFromPoint(
			event.touches[0].clientX,
			event.touches[0].clientY
		) as HTMLElement;

		if (overElement) {
			const link = links.find((l) => l.id === overElement.dataset.linkId);
			if (link) {
				swapLinks(draggedLink, link);
			}
		}
	}

	function onTouchDragEnd(event: TouchEvent) {
		touchDrag = false;
		draggedLink = null;
		renumberLinks();
	}

	function onDragStart(event: DragEvent, link: OrderableLink) {
		const target = event.target as HTMLElement;
		const li = target.closest('li');
		if (li) {
			const rect = li.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			if (event.dataTransfer) {
				event.dataTransfer.setDragImage(li, x, y);
				event.dataTransfer.effectAllowed = 'move';
			}
			// To allow the browser to make the drag image, we need to set the draggedLink in the next frame
			requestAnimationFrame(() => {
				draggedLink = link;
				clientY = event.clientY;
				dragAndDropScroll();
			});
		}
	}

	function dragAndDropScroll() {
		const buffer = 150; // distance from top or bottom
		const maxScrollSpeed = 20;

		if (clientY < buffer) {
			const scrollAmount = (maxScrollSpeed * (buffer - clientY)) / buffer;
			window.scrollBy(0, -scrollAmount);
		} else if (clientY > window.innerHeight - buffer) {
			const scrollAmount = (maxScrollSpeed * (clientY - (window.innerHeight - buffer))) / buffer;
			window.scrollBy(0, scrollAmount);
		}
		// Are we still dragging? Keep checking for scroll opportunities
		if (draggedLink) {
			requestAnimationFrame(dragAndDropScroll);
		}
	}

	function getPlaceholderUrl(type: string) {
		const platform = platforms.find((p) => p.id === type);
		return `e.g. ${platform ? platform.urlPattern : 'https://example.com/<username>'}`;
	}

	onMount(() => {
		// disable default dragover event, the return animation is slow and ugly
		function disableReturnAnimation(event: DragEvent) {
			event.preventDefault();
		}
		document.addEventListener('dragover', disableReturnAnimation);
		return () => {
			document.removeEventListener('dragover', disableReturnAnimation);
		};
	});
</script>

<div class="container">
	<h1>Customize your links</h1>
	<p>Add/edit/remove links below and then share all your profiles with the world!</p>

	<div class="links-container">
		<Button variant="secondary" on:click={onAddLink}>+ Add new link</Button>
		<ul on:dragover={onDragOver} on:dragend={onDragEnd}>
			{#if links.length === 0}
				<li class="tutorial">
					<img src="{base}/images/illustration-empty.svg" alt="" />
					<h2>Let's get you started</h2>
					<p>
						Use the “Add new link” button to get started. Once you have more than one link, you can
						reorder and edit them. We're here to help you share your profiles with everyone!
					</p>
				</li>
			{:else}
				{#each links as link, i (link.id)}
					<li
						class="link"
						class:dragging={draggedLink?.id === link.id}
						class:touched={touchDrag}
						data-link-id={link.id}
					>
						<div class="link-header">
							<div
								role="button"
								tabindex="-1"
								class="drag-handle"
								draggable="true"
								on:dragstart={(e) => onDragStart(e, link)}
								on:touchstart|passive={(e) => {
									onTouchDragStart(e, link);
								}}
								on:touchend|passive={(e) => {
									onTouchDragEnd(e);
								}}
								on:touchmove|passive={(e) => {
									onTouchDragMove(e);
								}}
							>
								<img src="{base}/images/icon-drag-and-drop.svg" alt="" />
								<h3>Link #{link.originalIndex + 1}</h3>
							</div>
							<button on:click={() => onRemoveLink(link)}>Remove</button>
						</div>
						<Select
							label="Platform"
							placeholder="Select a platform"
							bind:value={link.platform}
							options={platforms.map((platform) => ({
								value: platform.id,
								label: platform.name,
								icon: platform.icon
							}))}
						/>

						<Input
							label="Link"
							type="url"
							bind:value={link.url}
							placeholder={link.platform
								? getPlaceholderUrl(link.platform)
								: 'Select a platform first'}
						/>
					</li>
				{/each}
			{/if}
		</ul>
	</div>
</div>

<div class="save-container">
	<Button variant="primary" disabled={links.length === 0 || saving} on:click={onSave}>Save</Button>
</div>

<style lang="scss">
	h1,
	h2 {
		font-size: 1.5rem;
		font-weight: var(--fw-bold);
	}
	p {
		font-size: 1rem;
		color: var(--clr-base-500);
	}

	.links-container {
		margin-top: 2.5rem;
		display: grid;
		row-gap: 1.5rem;

		ul {
			display: grid;
			row-gap: 1.5rem;

			li {
				border-radius: 0.75rem;
				padding: 1.25rem;
				background-color: var(--clr-base-700);

				&.link {
					display: grid;
					row-gap: 0.75rem;

					transition:
						background-color var(--anim-duration),
						box-shadow var(--anim-duration);

					.link-header {
						display: flex;
						align-items: center;
						gap: 0.5rem;
						color: var(--clr-base-500);

						.drag-handle {
							touch-action: none;
							display: flex;
							align-items: center;
							gap: 0.5rem;

							h3 {
								font-weight: var(--fw-bold);
							}
						}

						button {
							color: inherit;
							border: none;
							background: none;
							cursor: pointer;
							font-weight: var(--fw-regular);
						}

						& > :last-child {
							margin-left: auto;
						}
					}

					&.dragging:not(.touched) {
						opacity: 0;
					}
					&.dragging.touched {
						background-color: var(--clr-primary-600);
						box-shadow: 0 0 2rem 0 rgba(var(--clr-primary-400-rgb), 25%);
					}
				}

				&.tutorial {
					padding-top: 3rem;
					padding-bottom: 3rem;

					display: grid;
					row-gap: 1.5rem;
					text-align: center;

					img {
						margin: auto;
						height: 5rem;
					}
				}
			}
		}
	}

	.container {
		padding: 1.5rem;
	}

	.save-container {
		margin-top: auto;
		padding: 1.5rem;
		border-top: 1px solid var(--clr-base-600);
	}
</style>
