<script>
	import { base } from '$app/paths';
</script>

<main>
	<header><img src="{base}/images/logo-devlinks-large.svg" alt="devlinks" /></header>
	<slot />
</main>

<style lang="scss">
	main {
		padding: 2rem;

		:global(h1) {
			font-size: 1.5rem;
			font-weight: 700;
			margin-top: 4rem;
		}

		:global(p) {
			margin-top: 0.5rem;
			font-size: 1rem;
			color: var(--clr-base-500);
		}

		:global(.auth-link-container) {
			margin-top: 1.5rem;
			text-align: center;
		}

		:global(form) {
			margin-top: 2.5rem;
			display: grid;
			row-gap: 1.5rem;

			:global(p) {
				font-size: 0.75rem;
				color: var(--clr-base-500);
			}
		}
	}
</style>
