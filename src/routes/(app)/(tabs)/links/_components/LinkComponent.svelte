<script lang="ts" context="module">
	import type { Link } from '$/lib/service';

	export type LinkDragEvent = {
		link: Link;
		clientX: number;
		clientY: number;
	};
	export type LinkDragEndEvent = {
		link: Link;
		cancelled: boolean;
	};

	export type LinkRemoveEvent = {
		link: Link;
	};
</script>

<script lang="ts">
	import { platforms } from '$lib/platform';
	import { createEventDispatcher, onMount } from 'svelte';
	import { base } from '$app/paths';
	import Select from '$/components/Select.svelte';
	import Input from '$/components/Input.svelte';

	export let link: Link;
	export let header = 'Link';

	const dispatch = createEventDispatcher<{
		remove: LinkRemoveEvent;
		dragStart: LinkDragEvent;
		dragEnd: LinkDragEndEvent;
		drag: LinkDragEvent;
	}>();

	let dragging = false;
	let touchDrag = false;

	function onDragStart(event: DragEvent) {
		const target = event.target as HTMLElement;
		const linkEl = target.closest('.link');
		if (linkEl) {
			const rect = linkEl.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			if (event.dataTransfer) {
				event.dataTransfer.setDragImage(linkEl, x, y);
				event.dataTransfer.effectAllowed = 'move';
			}
			// We need to do a pause to allow the drag image to be set
			requestAnimationFrame(() => {
				dragging = true;
				dispatch('dragStart', { link, clientX: event.clientX, clientY: event.clientY });
			});
		}
	}

	function onDrag(event: DragEvent) {
		dispatch('drag', { link, clientX: event.clientX, clientY: event.clientY });
	}

	function onDragEnd(event: DragEvent) {
		dragging = false;
		dispatch('dragEnd', { link, cancelled: event.dataTransfer?.dropEffect === 'none' });
	}

	function onTouchDragStart(event: TouchEvent) {
		touchDrag = true;
		dragging = true;
		dispatch('dragStart', {
			link,
			clientX: event.touches[0].clientX,
			clientY: event.touches[0].clientY
		});
	}

	function onTouchDragMove(event: TouchEvent) {
		dispatch('drag', {
			link,
			clientX: event.touches[0].clientX,
			clientY: event.touches[0].clientY
		});
	}

	function onTouchDragEnd(event: TouchEvent) {
		touchDrag = false;
		dragging = false;
		dispatch('dragEnd', {
			link,
			cancelled: false
		});
	}

	function getPlaceholderUrl(type: string) {
		const platform = platforms.find((p) => p.id === type);
		return `e.g. ${platform ? platform.urlPattern : 'https://example.com/<username>'}`;
	}

	onMount(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				if (touchDrag) {
					touchDrag = false;
					dragging = false;
					event.preventDefault();
					dispatch('dragEnd', {
						link,
						cancelled: true
					});
				}
			}
		};

		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('keydown', onKeyDown);
		};
	});
</script>

<div class="link" class:dragging class:touched={touchDrag}>
	<div class="link-header">
		<div
			role="button"
			tabindex="-1"
			class="drag-handle"
			draggable="true"
			on:dragstart={onDragStart}
			on:drag={onDrag}
			on:dragend={onDragEnd}
			on:touchstart|passive={onTouchDragStart}
			on:touchend|passive={onTouchDragEnd}
			on:touchmove|passive={onTouchDragMove}
		>
			<img src="{base}/images/icon-drag-and-drop.svg" alt="" />
			<h3>{header}</h3>
		</div>
		<button
			on:click={() => {
				dispatch('remove', { link });
			}}>Remove</button
		>
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
		placeholder={link.platform ? getPlaceholderUrl(link.platform) : 'Select a platform first'}
	/>
</div>

<style lang="scss">
	.link {
		border-radius: 0.75rem;
		padding: 1.25rem;
		background-color: var(--clr-base-700);
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
</style>
