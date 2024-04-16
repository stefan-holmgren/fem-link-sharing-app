<script context="module" lang="ts">
	export type SelectOption = {
		value: string;
		label: string;
		icon?: typeof SvelteComponent<{}>;
	};
</script>

<script lang="ts">
	import { createSelect, melt } from '@melt-ui/svelte';
	import { SvelteComponent } from 'svelte';

	export let label = '';
	export let placeholder = '';
	export let options: SelectOption[] = [];
	export let value: string | null = null;

	let selectedOption: SelectOption | null =
		options.find((option) => option.value === value) ?? null;

	const {
		elements: { trigger: triggerEl, menu: menuEl, label: labelEl, option: optionEl },
		states: { selected, open }
	} = createSelect<string>({
		defaultSelected: value ? { value } : undefined,
		portal: null
	});

	selected.subscribe((selectedValue) => {
		selectedOption = options.find((option) => option.value === selectedValue?.value) ?? null;
	});
</script>

<div class="select">
	<label use:melt={$labelEl} for={$triggerEl.id}>{label}</label>
	<button class:open={$open} use:melt={$triggerEl}>
		{#if selectedOption}
			{#if selectedOption.icon}
				<svelte:component this={selectedOption.icon} />
			{/if}
			<span>{selectedOption.label}</span>
		{:else}
			<span class="placeholder">{placeholder}</span>
		{/if}
	</button>
	{#if open}
		<ul use:melt={$menuEl}>
			{#each options as option (option.value)}
				<li use:melt={$optionEl({ value: option.value })}>
					{#if option.icon}
						<svelte:component this={option.icon} />
					{/if}
					<span>{option.label}</span>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
	.select {
		label {
			font-size: 0.75rem;
		}
		button {
			position: relative;
			text-align: left;
			appearance: none;
			cursor: pointer;
			margin-top: 0.25rem;
			min-height: 3em;
			width: 100%;
			font-size: 1rem;
			display: flex;
			align-items: center;
			column-gap: 0.75rem;
			border-radius: 0.5rem;
			padding: 0.75rem 1rem;
			border: 1px solid var(--clr-base-600);
			background: none no-repeat right 1rem center;
			background-color: var(--clr-base-900);
			color: var(--base-400);

			span.placeholder {
				opacity: 50%;
			}

			&::after {
				position: absolute;
				content: '';
				display: inline-block;
				width: 0.75rem;
				height: 0.75rem;
				place-content: center;
				top: 50%;
				right: 1rem;
				transform: translateY(-50%);
				background-image: url('/images/icon-chevron-down.svg');
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center;
			}

			&.open::after {
				transform: translateY(-50%) rotate(180deg);
			}

			&:focus {
				outline: none;
				border: 1px solid rgb(var(--clr-primary-400-rgb));
				box-shadow: 0 0 2rem rgba(var(--clr-primary-400-rgb), 25%);
			}
		}

		ul {
			z-index: 1;
			font-size: 1rem;
			margin-top: 0.5rem;
			border-radius: 0.5rem;
			border: 1px solid var(--clr-base-600);
			background-color: var(--clr-base-900);
			width: 100%;
			box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 10%);

			padding: 0.75rem 1rem;

			display: grid;
			row-gap: 0.75rem;

			li {
				display: flex;
				column-gap: 0.75rem;
				cursor: pointer;
				&[data-highlighted] {
					color: var(--clr-primary-500);
				}

				&[data-selected] {
					color: var(--clr-primary-400);
				}

				&:not(:first-child) {
					border-top: 1px solid var(--clr-base-600);
					padding-top: 1rem;
				}
			}
		}
	}
</style>
