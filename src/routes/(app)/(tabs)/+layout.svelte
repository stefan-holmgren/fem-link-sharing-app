<script lang="ts">
	import { base } from '$app/paths';
	import LinksIcon from '$/icons/icon-links-header.svg?raw';
	import ProfileIcon from '$/icons/icon-profile-details-header.svg?raw';
	import PreviewIcon from '$/icons/icon-preview-header.svg?raw';
	import { page } from '$app/stores';
</script>

<main>
	<header>
		<img src="{base}/images/logo-devlinks-small.svg" alt="devlinks" />
		<nav>
			<a href="{base}/" class:active={$page.url.pathname === `${base}/links`}
				>{@html LinksIcon}<span>Links</span></a
			><a href="{base}/profile" class:active={$page.url.pathname === `${base}/profile`}
				>{@html ProfileIcon}<span>Profile Details</span></a
			>
		</nav>
		<a href="{base}/preview">{@html PreviewIcon}<span>Preview</span></a>
	</header>
	<div>
		<slot />
		<div>Hello</div>
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
				a {
					transition: all var(--anim-duration);
					color: var(--clr-base-500);
					border-radius: 0.5rem;
					padding: 0.6875rem 1.6875rem;
					span {
						display: none;
					}

					&.active {
						color: var(--clr-primary-400);
						background-color: var(--clr-primary-600);
					}

					&:hover {
						color: var(--clr-primary-400);
					}
				}
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
			position: relative;
			background-color: var(--clr-base-900);
			margin: 1rem;
			padding: 1.5rem;
			border-radius: 0.75rem;
			flex: 1;
		}
	}
</style>
