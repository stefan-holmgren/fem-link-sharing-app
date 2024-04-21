<script lang="ts">
	import Button from '$/components/Button.svelte';
	import { onMount } from 'svelte';
	import { saveLinks, type Link, linksStore } from '$lib/service';
	import LinkComponent, {
		type LinkDragEndEvent,
		type LinkDragEvent,
		type LinkRemoveEvent
	} from './_components/LinkComponent.svelte';
	import TutorialComponent from './_components/TutorialComponent.svelte';

	export let data;
	const { user } = data;

	type OrderableLink = Link & { originalIndex: number };

	let currentClientY = 0;

	let links: OrderableLink[] = [];
	let originalLinks: OrderableLink[] = [];
	let draggedLink: OrderableLink | null;
	let saving = false;
	let loading = true;
	let modified = false;

	linksStore.subscribe((value) => {
		if (!value) return;
		loading = false;
		links = value.map((link, i) => ({
			...link,
			originalIndex: i
		}));
		originalLinks = JSON.parse(JSON.stringify(links));
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
				platform: 'github',
				url: '',
				originalIndex: links.length
			}
		];

		requestAnimationFrame(() => {
			const lastLi = document.querySelector('.links-container > ul > li:last-child');
			lastLi?.scrollIntoView({ behavior: 'smooth' });
		});
	}

	function onRemoveLink(event: CustomEvent<LinkRemoveEvent>) {
		const { link } = event.detail;
		links = links.filter((l) => l.id !== link.id);
		renumberLinks();
	}

	async function onSave() {
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
			// TODO show error to user
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

	function onDragStart(event: CustomEvent<LinkDragEvent>) {
		const { link, clientY } = event.detail;
		const linkToDrag = links.find((l) => l.id === link.id);

		console.log('Link to drag:', linkToDrag);
		if (linkToDrag) {
			draggedLink = linkToDrag;
			requestAnimationFrame(() => {
				currentClientY = clientY;
				dragAndDropScroll();
			});
		}
	}

	function onDrag(event: CustomEvent<LinkDragEvent>) {
		const { clientX, clientY } = event.detail;
		currentClientY = clientY;

		const overElement = document.elementFromPoint(clientX, clientY) as HTMLElement;
		if (!overElement) return;

		const overLi = overElement.closest('li[data-link-id]');
		if (!overLi) return;

		const dragOverLink = links.find((l) => l.id === (overLi as HTMLElement).dataset.linkId);

		if (draggedLink && dragOverLink) {
			swapLinks(draggedLink, dragOverLink);
		}
	}

	function onDragEnd(event: CustomEvent<LinkDragEndEvent>) {
		draggedLink = null;
		renumberLinks();
	}

	function dragAndDropScroll() {
		const buffer = 150; // distance from top or bottom
		const maxScrollSpeed = 20;

		if (currentClientY < buffer) {
			const scrollAmount = (maxScrollSpeed * (buffer - currentClientY)) / buffer;
			window.scrollBy(0, -scrollAmount);
		} else if (currentClientY > window.innerHeight - buffer) {
			const scrollAmount =
				(maxScrollSpeed * (currentClientY - (window.innerHeight - buffer))) / buffer;
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

	$: {
		modified = JSON.stringify(links) !== JSON.stringify(originalLinks);
	}
</script>

<div class="container">
	<h1>Customize your links</h1>
	<p>Add/edit/remove links below and then share all your profiles with the world!</p>

	<div class="links-container">
		<Button variant="secondary" on:click={onAddLink} disabled={loading}>+ Add new link</Button>
		<ul>
			{#if links.length === 0}
				{#if !loading}
					<TutorialComponent />
				{/if}
			{:else}
				{#each links as link, i (link.id)}
					<li data-link-id={link.id}>
						<LinkComponent
							header={`Link #${link.originalIndex + 1}`}
							{link}
							on:remove={onRemoveLink}
							on:dragStart={onDragStart}
							on:drag={onDrag}
							on:dragEnd={onDragEnd}
						/>
					</li>
				{/each}
			{/if}
		</ul>
	</div>
</div>

<div class="save-container">
	<Button variant="primary" disabled={!modified || saving || loading} on:click={onSave}>Save</Button
	>
</div>

<style lang="scss">
	h1 {
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
