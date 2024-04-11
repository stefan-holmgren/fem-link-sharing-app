<script lang="ts">
	import { signUpWithEmailAndPassword } from '$/auth';
	import Button from '$/components/Button.svelte';
	import Input from '$/components/Input.svelte';
	import type { InputRef } from '$/components/Input.svelte';
	import { AccountAlreadyExistsError } from '$/lib/errors';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	let email = '';
	let password = '';
	let confirmPassword = '';

	let emailRef: InputRef;
	let passwordRef: InputRef;
	let confirmPasswordRef: InputRef;

	let busy = false;

	async function signup() {
		if (password !== confirmPassword) {
			passwordRef.triggerError('Mismatch');
			confirmPasswordRef.triggerError('Mismatch');
			return;
		}

		busy = true;
		try {
			await signUpWithEmailAndPassword({ email, password });
			goto(`${base}/`, { replaceState: true });
		} catch (err) {
			if (err instanceof AccountAlreadyExistsError) {
				emailRef.triggerError('Already exists');
			}
		} finally {
			busy = false;
		}
	}
</script>

<h1>Create account</h1>
<p>Let's get you started sharing your links!</p>
<form on:submit={signup}>
	<Input
		bind:ref={emailRef}
		label="Email address"
		type="email"
		bind:value={email}
		required
		placeholder="e.g. alex@email.com"
		autocomplete="username"
	/>
	<Input
		bind:ref={passwordRef}
		label="Password"
		type="password"
		bind:value={password}
		required
		minlength={8}
		autocomplete="new-password"
		placeholder="At least 8 characters"
	/>
	<Input
		bind:ref={confirmPasswordRef}
		label="Confirm password"
		type="password"
		bind:value={confirmPassword}
		required
		minlength={8}
		autocomplete="new-password"
		placeholder="At least 8 characters"
	/>
	<p>Password must contain at least 8 characters</p>
	<Button type="submit" disabled={busy}>Create new account</Button>
</form>

<div class="auth-link-container">
	<p>Already have an account?</p>
	<a href="{base}/login">Login</a>
</div>
