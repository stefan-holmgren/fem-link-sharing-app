<script lang="ts">
	export let buffer = 150;
	export let maxScrollSpeed = 20;
	export let enabled = false;
	export let currentClientY = 0;

	let currentlyEnabled = false;

	function dragAndDropScroll() {
		if (currentClientY < buffer) {
			const scrollAmount = (maxScrollSpeed * (buffer - currentClientY)) / buffer;
			window.scrollBy(0, -scrollAmount);
		} else if (currentClientY > window.innerHeight - buffer) {
			const scrollAmount =
				(maxScrollSpeed * (currentClientY - (window.innerHeight - buffer))) / buffer;
			window.scrollBy(0, scrollAmount);
		}
		// Are we still dragging? Keep checking for scroll opportunities
		if (enabled) {
			requestAnimationFrame(dragAndDropScroll);
		}
	}

	$: {
		if (enabled && !currentlyEnabled) {
			currentlyEnabled = true;
			dragAndDropScroll();
		} else if (!enabled && currentlyEnabled) {
			currentlyEnabled = false;
		}
	}
</script>
