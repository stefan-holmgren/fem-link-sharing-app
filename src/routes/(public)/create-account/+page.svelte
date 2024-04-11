<script>
	import { signUpWithEmailAndPassword } from '$/auth';
	import Button from '$/components/Button.svelte';
	import Input from '$/components/Input.svelte';
	import { base } from '$app/paths';

	let email = '';
	let password = '';
	let confirmPassword = '';

	async function signup() {
		try {
			await signUpWithEmailAndPassword({ email, password });
		} catch (err) {}
	}
</script>

<h1>Create account</h1>
<p>Let's get you started sharing your links!</p>
<form on:submit={signup}>
	<Input
		label="Email address"
		type="email"
		bind:value={email}
		required
		placeholder="e.g. alex@email.com"
		autocomplete="username"
	/>
	<Input
		label="Password"
		type="password"
		bind:value={password}
		required
		minlength={8}
		autocomplete="new-password"
		placeholder="At least 8 characters"
	/>
	<Input
		label="Confirm password"
		type="password"
		bind:value={confirmPassword}
		required
		minlength={8}
		autocomplete="new-password"
		placeholder="At least 8 characters"
	/>
	<p>Password must contain at least 8 characters</p>
	<Button type="submit">Create new account</Button>
</form>

<div class="auth-link-container">
	<p>Already have an account?</p>
	<a href="{base}/login">Login</a>
</div>
