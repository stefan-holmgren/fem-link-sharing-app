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
			:global(a) {
				color: var(--clr-primary-400);
			}
		}

		:global(form) {
			margin-top: 2.5rem;
			display: grid;
			row-gap: 1.5rem;

			:global(label) {
				display: block;
				font-size: 0.75rem;

				:global(input) {
					position: relative;
					margin-top: 0.25rem;
					width: 100%;
					font-size: 1rem;
					display: block;
					border-radius: 0.5rem;
					padding: 0.75rem 1rem;
					border: 1px solid var(--clr-base-600);
					padding-left: 2.75rem;
					background: none no-repeat 1rem center;
				}

				:global(input::after) {
					content: 'HELLO';
					display: block;
					position: absolute;
					top: 50%;
					right: 1rem;
					transform: translateY(-50%);
					width: 1.5rem;
					height: 1.5rem;
					background-size: contain;
				}

				:global(input:focus) {
					outline: none;
					border: 1px solid var(--clr-primary-400);
					box-shadow: 0 0 2rem rgba(var(--clr-primary-400-rgb), 25%);
				}

				:global(input::-webkit-input-placeholder) {
					color: var(--clr-base-400);
					opacity: 0.5;
				}

				:global(input::-moz-input-placeholder) {
					color: var(--clr-base-400);
					opacity: 0.5;
				}

				:global(input[type='email']) {
					background-image: url('/images/icon-email.svg');
				}

				:global(input[type='password']) {
					background-image: url('/images/icon-password.svg');
				}
			}
			:global(p) {
				font-size: 0.75rem;
				color: var(--clr-base-500);
			}

			:global(button) {
				padding: 0.75rem 1.5rem;
				color: var(--clr-base-900);
				background-color: var(--clr-primary-400);
				border: none;
				border-radius: 0.5rem;
				font-size: 1rem;
				font-weight: var(--fw-semibold);
			}
		}
	}
</style>
