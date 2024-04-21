<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		// disable default dragover event, the return animation is slow and ugly
		function disableReturnAnimation(event: DragEvent) {
			event.preventDefault();
		}

		document.addEventListener('dragover', disableReturnAnimation);
		return () => {
			document.removeEventListener('dragover', disableReturnAnimation);
		};
	});
</script>
