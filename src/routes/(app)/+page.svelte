<script lang="ts" context="module">
	import { base } from '$app/paths';
	import { redirect } from '@sveltejs/kit';

	redirect(302, `${base}/links`);
</script>

<h1>Hello</h1>
