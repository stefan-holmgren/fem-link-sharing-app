<script lang="ts">
	import { getContext } from 'svelte';

	export let value: string;
	let name: string = getContext('name');
</script>

<li>
	<label>
		<input type="radio" {name} {value} />
		<span><slot /></span>
	</label>
</li>
