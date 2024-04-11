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
	button {
		cursor: pointer;
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 0.5rem;
		font-size: 1rem;
		font-weight: var(--fw-semibold);

		transition: all var(--anim-duration);

		&:disabled {
			cursor: not-allowed;
		}

		&[data-variant='primary'] {
			color: var(--clr-base-900);
			background-color: var(--clr-primary-400);

			&:active,
			&:hover,
			&:disabled {
				background-color: var(--clr-primary-500);
			}

			&:not(:disabled) {
				&:active,
				&:hover {
					box-shadow: 0 0 2rem 0 rgba(var(--clr-primary-400-rgb), 25%);
				}
			}

			&:disabled {
				opacity: 0.75;
			}
		}

		&[data-variant='secondary'] {
			border: 1px solid var(--clr-primary-400);
			background-color: var(--clr-base-900);
			color: var(--clr-primary-400);

			&:disabled {
				opacity: 0.25;
			}

			&:not(:disabled) {
				&:active,
				&:hover {
					background-color: var(--clr-primary-600);
				}
			}
		}
	}
</style>
