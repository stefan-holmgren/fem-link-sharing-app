<script>
	import { signUpWithEmailAndPassword } from '$/auth';
	import { base } from '$app/paths';

	let email = '';
	let password = '';
	let confirmPassword = '';

	async function signup() {
		await signUpWithEmailAndPassword(email, password);
	}
</script>

<h1>Create account</h1>
<p>Let's get you started sharing your links!</p>
<form on:submit={signup}>
	<label
		>Email address<input
			type="email"
			bind:value={email}
			required
			placeholder="e.g. alex@email.com"
			autocomplete="username"
		/></label
	>
	<label
		>Password<input
			type="password"
			bind:value={password}
			required
			autocomplete="new-password"
			placeholder="At least 8 characters"
		/></label
	>
	<label
		>Confirm password<input
			type="password"
			bind:value={confirmPassword}
			required
			autocomplete="new-password"
			placeholder="At least 8 characters"
		/></label
	>
	<p>Password must contain at least 8 characters</p>
	<button type="submit">Create new account</button>
</form>

<div class="auth-link-container">
	<p>Already have an account?</p>
	<a href="{base}/login">Login</a>
</div>
