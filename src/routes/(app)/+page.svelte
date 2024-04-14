<script lang="ts" context="module">
	import { getUser } from '$/auth';
	import { base } from '$app/paths';
	import { redirect } from '@sveltejs/kit';
	const user = await getUser();
	redirect(302, user ? `${base}/links` : `${base}/login`);
</script>
