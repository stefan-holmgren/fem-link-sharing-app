<script lang="ts">
	import { page } from '$app/stores';
	export let href: string;
</script>

<a {href} class:active={$page.url.pathname === href}
	><div class="icon"><slot name="icon" /></div>
	<div class="label"><slot name="label" /></div></a
>

<style lang="scss">
	a {
		transition: all var(--anim-duration);
		color: var(--clr-base-500);
		border-radius: 0.5rem;
		padding: 0.6875rem 1.6875rem;

		&.active {
			color: var(--clr-primary-400);
			background-color: var(--clr-primary-600);
		}

		&:hover {
			color: var(--clr-primary-400);
		}

		.label {
			display: none;
		}
	}
</style>
