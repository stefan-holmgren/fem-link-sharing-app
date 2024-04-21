<script lang="ts" context="module">
	import { type Link } from '$lib/service';
	export type OrderableLink = Link & { originalIndex: number };
</script>

<script lang="ts">
	import Button from '$/components/Button.svelte';
	import { onMount } from 'svelte';
	import { saveLinks, linksStore } from '$lib/service';
	import LinkComponent, {
		type LinkDragEndEvent,
		type LinkDragEvent,
		type LinkRemoveEvent
	} from './_components/LinkComponent.svelte';
	import TutorialComponent from './_components/TutorialComponent.svelte';
	import { convertToOrderableLinks } from './_lib/convertToOrderableLinks';
	import { swapOrderableLinks } from './_lib/swapOrderableLinks';
	import { convertToLinks } from './_lib/convertToLinks';

	export let data;
	const { user } = data;

	let currentClientY = 0;

	let orderableLinks: OrderableLink[] = [];
	let originalLinks: OrderableLink[] = [];
	let draggedLink: OrderableLink | null;
	let saving = false;
	let loading = true;
	let modified = false;

	linksStore.subscribe((value) => {
		if (!value) return;
		loading = false;
		orderableLinks = convertToOrderableLinks(value);
		originalLinks = JSON.parse(JSON.stringify(orderableLinks));
	});

	function renumberLinks() {
		orderableLinks.forEach((orderableLink, i) => {
			orderableLink.originalIndex = i;
		});
		orderableLinks = [...orderableLinks];
	}

	function resetLinksInOrder() {
		orderableLinks.sort((a, b) => a.originalIndex - b.originalIndex);
		orderableLinks = [...orderableLinks];
	}

	function onAddLink() {
		orderableLinks = [
			...orderableLinks,
			{
				id: Date.now().toString(36),
				platform: 'github',
				url: '',
				originalIndex: orderableLinks.length
			}
		];

		requestAnimationFrame(() => {
			const lastLi = document.querySelector('.links-container > ul > li:last-child');
			lastLi?.scrollIntoView({ behavior: 'smooth' });
		});
	}

	function onRemoveLink(event: CustomEvent<LinkRemoveEvent>) {
		const { link } = event.detail;
		orderableLinks = orderableLinks.filter((l) => l.id !== link.id);
		renumberLinks();
	}

	async function onSave() {
		const links = convertToLinks(orderableLinks);

		saving = true;
		try {
			await saveLinks(user.uid, links);
			linksStore.set(links);
		} catch (error) {
			// TODO show error to user
			console.error(error);
		} finally {
			saving = false;
		}
	}

	function swapLinks(link1: OrderableLink, link2: OrderableLink) {
		swapOrderableLinks(orderableLinks, link1, link2);
		orderableLinks = [...orderableLinks];
	}

	function onDragStart(event: CustomEvent<LinkDragEvent>) {
		const { link, clientY } = event.detail;
		const linkToDrag = orderableLinks.find((l) => l.id === link.id);
		if (linkToDrag) {
			draggedLink = linkToDrag;
			currentClientY = clientY;
			dragAndDropScroll();
		}
	}

	function getOrderableLinkAt(clientX: number, clientY: number): OrderableLink | null {
		const overElement = document.elementFromPoint(clientX, clientY) as HTMLElement;
		if (!overElement) return null;

		const overLi = overElement.closest('li[data-link-id]');
		if (!overLi) return null;

		const dragOverLink = orderableLinks.find(
			(l) => l.id === (overLi as HTMLElement).dataset.linkId
		);
		return dragOverLink ?? null;
	}

	function onDrag(event: CustomEvent<LinkDragEvent>) {
		const { clientX, clientY } = event.detail;
		const dragOverLink = getOrderableLinkAt(clientX, clientY);
		if (draggedLink && dragOverLink && draggedLink.id !== dragOverLink.id) {
			console.log('SWAP LINKS');
			swapLinks(draggedLink, dragOverLink);
		}
		currentClientY = clientY;
	}

	function onDragEnd(event: CustomEvent<LinkDragEndEvent>) {
		draggedLink = null;
		if (event.detail.cancelled) {
			resetLinksInOrder();
			return;
		}
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
		// No need to check the modified as long as we're dragging
		if (!draggedLink) {
			modified = JSON.stringify(orderableLinks) !== JSON.stringify(originalLinks);
		}
	}
</script>

<div class="container">
	<h1>Customize your links</h1>
	<p>Add/edit/remove links below and then share all your profiles with the world!</p>

	<div class="links-container">
		<Button variant="secondary" on:click={onAddLink} disabled={loading}>+ Add new link</Button>
		<ul>
			{#if orderableLinks.length === 0}
				{#if !loading}
					<TutorialComponent />
				{/if}
			{:else}
				{#each orderableLinks as link, i (link.id)}
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
