<script lang="ts">
	import { signInWithEmailAndPassword } from '$/auth';
	import { base } from '$app/paths';

	let email = '';
	let password = '';

	async function signin() {
		await signInWithEmailAndPassword(email, password);
	}
</script>

<h1>Login</h1>
<p>Add your details below to get back into the app</p>
<form on:submit={signin}>
	<label
		>Email address:<input
			type="email"
			bind:value={email}
			required
			placeholder="e.g. alex@email.com"
			autocomplete="username"
		/></label
	>
	<label
		>Password:<input
			type="password"
			bind:value={password}
			required
			placeholder="Enter your password"
			autocomplete="current-password"
		/></label
	>
	<button type="submit">Login</button>
</form>
<div class="auth-link-container">
	<p>Don't have an account?</p>
	<a href="{base}/create-account">Create account</a>
</div>
