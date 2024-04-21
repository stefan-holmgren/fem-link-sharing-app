<script lang="ts">
	import { base } from '$app/paths';
</script>

<div>
	<img src="{base}/images/illustration-empty.svg" alt="" />
	<h2>Let's get you started</h2>
	<p>
		Use the “Add new link” button to get started. Once you have more than one link, you can reorder
		and edit them. We're here to help you share your profiles with everyone!
	</p>
</div>

<style lang="scss">
	div {
		h2 {
			font-size: 1.5rem;
			font-weight: var(--fw-bold);
		}

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
</style>
