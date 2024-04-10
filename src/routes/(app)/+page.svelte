<script lang="ts">
	import { base } from '$app/paths';
	import { getUser, signOut } from '../../auth';

	async function onSignOut() {
		await signOut();
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.s velte.dev</a> to read the documentation</p>
<pre>{JSON.stringify(getUser(), null, 2)}</pre>
<a href="{base}/about">About</a>
<button on:click={onSignOut}>Sign out</button>
