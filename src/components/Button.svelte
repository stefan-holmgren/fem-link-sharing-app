<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export let type: HTMLButtonAttributes['type'] = 'button';
	export let disabled: HTMLButtonAttributes['disabled'] = false;

	export let variant: 'primary' | 'secondary' = 'primary';
</script>

<button data-variant={variant} {type} {disabled}>
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
