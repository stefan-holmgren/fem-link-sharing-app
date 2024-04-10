<script lang="ts">
	import { base } from '$app/paths';
	export let data;
</script>

<h1>About</h1>
<p>This is the about page for {data.user.email}</p>
<a href="{base}/">Home</a>
<a href="{base}/about/content">Content</a>
