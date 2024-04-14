<script lang="ts">
	import Button from '$/components/Button.svelte';
</script>

<div class="container">
	<p>
		Lorem ipsum dolor sit, amet consectetur adipisicing elit. In enim beatae facere optio veniam
		molestiae, similique ipsum. Blanditiis, minima! Ab in quas laboriosam ad dolorem nam at aliquam
		veritatis rerum! Deserunt aperiam nostrum consequuntur minus neque reiciendis amet atque eveniet
		quo? Nobis repellendus ab accusantium quo cumque animi, harum voluptatum, quasi sunt similique
	</p>
	<p>
		Lorem ipsum dolor sit, amet consectetur adipisicing elit. In enim beatae facere optio veniam
		molestiae, similique ipsum. Blanditiis, minima! Ab in quas laboriosam ad dolorem nam at aliquam
		veritatis rerum! Deserunt aperiam nostrum consequuntur minus neque reiciendis amet atque eveniet
		quo? Nobis repellendus ab accusantium quo cumque animi, harum voluptatum, quasi sunt similique
	</p>
	<div>
		<Button>Save</Button>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;

		p {
			flex-grow: 1;
		}
		div {
			margin-top: 1rem;
		}
	}
</style>
