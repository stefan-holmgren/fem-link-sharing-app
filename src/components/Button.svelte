<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export let type: HTMLButtonAttributes['type'] = 'button';
	export let disabled: HTMLButtonAttributes['disabled'] = false;

	export let variant: 'primary' | 'secondary' = 'primary';

	const dispatch = createEventDispatcher<{
		click: void;
	}>();
</script>

<button data-variant={variant} {type} {disabled} on:click={() => dispatch('click')}>
	<slot />
</button>

<style lang="scss">
	@import '$/mixins.scss';

	button {
		@include button;

		&[data-variant='primary'] {
			@include button('primary');
		}

		&[data-variant='secondary'] {
			@include button('secondary');
		}
	}
</style>
