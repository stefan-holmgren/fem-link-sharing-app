<script lang="ts">
	import { base } from '$app/paths';
	import NavLink from '$/components/NavLink.svelte';
	import IconLinksHeader from '$/icons/IconLinksHeader.svelte';
	import IconProfileDetailsHeader from '$/icons/IconProfileDetailsHeader.svelte';
	import IconPreviewHeader from '$/icons/IconPreviewHeader.svelte';
</script>

<main>
	<header>
		<img src="{base}/images/logo-devlinks-small.svg" alt="devlinks" />
		<nav>
			<NavLink href="{base}/links">
				<IconLinksHeader slot="icon" />
				<span slot="label">Links</span>
			</NavLink>
			<NavLink href="{base}/profile">
				<IconProfileDetailsHeader slot="icon" />
				<span slot="label">Profile Details</span>
			</NavLink>
		</nav>
		<a href="{base}/preview"><IconPreviewHeader /><span>Preview</span></a>
	</header>
	<div>
		<slot />
	</div>
</main>

<style lang="scss">
	@import '$/mixins.scss';
	main {
		background-color: var(--clr-base-700);
		min-height: 100vh;
		min-height: 100svh;
		display: flex;
		flex-direction: column;

		header {
			position: sticky;
			top: 0;

			padding: 1rem 1.5rem;
			background-color: var(--clr-base-900);
			display: grid;
			grid-template-columns: 3.25rem 1fr 3.25rem;
			align-items: center;

			z-index: 1;

			& > * {
				justify-self: center;
			}

			& > :first-child {
				justify-self: start;
			}

			& > :last-child {
				justify-self: end;
			}

			> nav {
				position: relative;
				display: grid;
				grid-auto-flow: column;
			}
			> a {
				@include button('secondary');
				padding: 0.6875rem 1rem;
				span {
					display: none;
				}
			}
		}

		> div {
			display: flex;
			flex-direction: column;
			position: relative;
			background-color: var(--clr-base-900);
			margin: 1rem;
			border-radius: 0.75rem;
			flex: 1;
		}
	}
</style>
