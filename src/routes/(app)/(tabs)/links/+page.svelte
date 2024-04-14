<script lang="ts">
	import { flip } from 'svelte/animate';
	import { base } from '$app/paths';
	import Button from '$/components/Button.svelte';
	import Input from '$/components/Input.svelte';
	import { onMount } from 'svelte';

	type Link = {
		id: string;
		type: 'github';
		url: string;
	};

	type OrderableLink = Link & { originalIndex: number };

	let clientY = 0;

	let links: OrderableLink[] = [
		{ id: Date.now().toString(), type: 'github', url: 'blahblah', originalIndex: 0 }
	];

	let draggedLink: OrderableLink | null;

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
				id: Date.now().toString(),
				type: 'github',
				url: Date.now().toString(),
				originalIndex: links.length
			}
		];

		requestAnimationFrame(() => {
			const lastLi = document.querySelector('.links-container ul li:last-child');
			lastLi?.scrollIntoView({ behavior: 'smooth' });
		});
	}

	function onRemoveLink(link: OrderableLink) {
		links = links.filter((l) => l !== link);
		renumberLinks();
	}

	function onDragOver(event: DragEvent) {
		event.preventDefault();

		// for drag-scrolling
		clientY = event.clientY;

		const target = event.target as HTMLElement;
		const li = target.closest('li');
		const targetLink = li && links.find((l) => l.id === li.dataset.linkId);

		if (targetLink?.id === draggedLink?.id) return;

		if (targetLink && draggedLink) {
			const draggedIndex = links.indexOf(draggedLink);
			const targetIndex = links.indexOf(targetLink);
			links.splice(draggedIndex, 1);
			links.splice(targetIndex, 0, draggedLink);
			links = [...links];
		}
	}

	function onDragEnd(event: DragEvent) {
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

	function onDrop(event: DragEvent) {}

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
		<ul on:drop={onDrop} on:dragover={onDragOver} on:dragend={onDragEnd}>
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
					<li class="link" class:dragging={draggedLink?.id === link.id} data-link-id={link.id}>
						<div class="link-header">
							<div
								role="button"
								tabindex="-1"
								class="drag-handle"
								draggable="true"
								on:dragstart={(e) => onDragStart(e, link)}
							>
								<img src="{base}/images/icon-drag-and-drop.svg" alt="" />
								<h3>Link #{link.originalIndex + 1}</h3>
							</div>
							<button on:click={() => onRemoveLink(link)}>Remove</button>
						</div>
						<Input
							label="Link"
							type="url"
							bind:value={link.url}
							placeholder="e.g. https://www.github.com/"
						/>
					</li>
				{/each}
			{/if}
		</ul>
	</div>
</div>

<div class="save-container">
	<Button variant="primary" disabled={links.length === 0}>Save</Button>
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
					.link-header {
						display: flex;
						align-items: center;
						gap: 0.5rem;
						color: var(--clr-base-500);

						.drag-handle {
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

					&.dragging {
						opacity: 0;
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
