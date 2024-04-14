<script lang="ts">
	import { base } from '$app/paths';
	import Button from '$/components/Button.svelte';
	import Input from '$/components/Input.svelte';

	type Link = {
		type: 'github';
		url: string;
	};

	let links: Link[] = [{ type: 'github', url: '' }];

	function onAddLink() {
		links = [...links, { type: 'github', url: '' }];
	}

	function onRemoveLink(index: number) {
		links = links.filter((_, i) => i !== index);
	}
</script>

<div class="container">
	<h1>Customize your links</h1>
	<p>Add/edit/remove links below and then share all your profiles with the world!</p>

	<div class="links-container">
		<Button variant="secondary" on:click={onAddLink}>+ Add new link</Button>
		<ul>
			{#if links.length === 0}
				<li class="tutorial">
					<img src="{base}/images/illustration-empty.svg" alt="" />
					<h2>Let's get you started</h2>
					<p>
						Use the “Add new link” button to get started. Once you have more than one link, you can
						reorder and edit them. We're here to help you share your profiles with everyone!
					</p>
				</li>
			{:else}
				{#each links as link, i}
					<li class="link">
						<div class="link-header">
							<img src="{base}/images/icon-drag-and-drop.svg" alt="" />
							<h3>Link #{i + 1}</h3>
							<button on:click={() => onRemoveLink(i)}>Remove</button>
						</div>
						<Input
							label="Link"
							type="url"
							bind:value={link.url}
							placeholder="e.g. https://www.github.com/"
						/>
					</li>
				{/each}
			{/if}
		</ul>
	</div>
</div>

<div class="save-container">
	<Button variant="primary" disabled={links.length === 0}>Save</Button>
</div>

<style lang="scss">
	h1,
	h2 {
		font-size: 1.5rem;
		font-weight: var(--fw-bold);
	}
	p {
		font-size: 1rem;
		color: var(--clr-base-500);
	}

	.links-container {
		margin-top: 2.5rem;
		display: grid;
		row-gap: 1.5rem;

		ul {
			display: grid;
			row-gap: 1.5rem;

			li {
				border-radius: 0.75rem;
				padding: 1.25rem;
				background-color: var(--clr-base-700);

				&.link {
					.link-header {
						display: flex;
						align-items: center;
						gap: 0.5rem;
						color: var(--clr-base-500);

						h3 {
							font-weight: var(--fw-bold);
						}

						button {
							color: inherit;
							border: none;
							background: none;
							cursor: pointer;
							font-weight: var(--fw-regular);
						}

						& > :last-child {
							margin-left: auto;
						}
					}
				}

				&.tutorial {
					padding-top: 3rem;
					padding-bottom: 3rem;

					display: grid;
					row-gap: 1.5rem;
					text-align: center;

					img {
						margin: auto;
						height: 5rem;
					}
				}
			}
		}
	}

	.container {
		padding: 1.5rem;
	}

	.save-container {
		margin-top: auto;
		padding: 1.5rem;
		border-top: 1px solid var(--clr-base-600);
	}
</style>
