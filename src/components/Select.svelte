<script lang="ts">
	import { setContext } from 'svelte';
	export let label = '';
	export let name: string;

	let dropDownListId = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
	let hidden = true;

	setContext('name', name);
</script>

<label
	>{label}
	<div>
		<button
			role="combobox"
			aria-expanded={!hidden}
			aria-controls={dropDownListId}
			on:click={() => (hidden = !hidden)}>Value</button
		>
		<ul class:hidden id={dropDownListId}>
			<slot />
		</ul>
	</div>
</label>

<style lang="scss">
	label {
		font-size: 0.75rem;

		div {
			position: relative;
			button {
				text-align: left;
				appearance: none;
				cursor: pointer;
				margin-top: 0.25rem;
				width: 100%;
				font-size: 1rem;
				display: block;
				border-radius: 0.5rem;
				padding: 0.75rem 1rem;
				border: 1px solid var(--clr-base-600);
				background: none no-repeat right 1rem center;
				background-color: var(--clr-base-900);
				color: var(--base-400);

				background-image: url('/images/icon-chevron-down.svg');

				&:focus {
					outline: none;
					border: 1px solid rgb(var(--clr-primary-400-rgb));
					box-shadow: 0 0 2rem rgba(var(--clr-primary-400-rgb), 25%);
				}
			}

			ul {
				max-height: 5rem;
				overflow-y: auto;
				font-size: 1rem;
				position: absolute;
				margin-top: 0.5rem;
				z-index: 1;
				border-radius: 0.5rem;

				border: 1px solid var(--clr-base-600);
				background-color: var(--clr-base-900);
				width: 100%;
				box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 10%);

				padding: 0.75rem 1rem;

				display: grid;
				row-gap: 0.75rem;

				&.hidden {
					display: none;
				}

				::-webkit-scrollbar {
					background: transparent;
					width: 0;
					border: none;
				}
				scrollbar-width: none;
			}
		}
	}
</style>
