<script lang="ts">
	import { signInWithEmailAndPassword } from '$/lib/auth';
	import Button from '$/components/Button.svelte';
	import Input, { type InputRef } from '$/components/Input.svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	let email = '';
	let password = '';

	let emailRef: InputRef;
	let passwordRef: InputRef;

	let busy = false;

	async function signin() {
		busy = true;
		try {
			await signInWithEmailAndPassword({ email, password });
			goto(`${base}/`, { replaceState: true });
		} catch (ex) {
			password = '';
			emailRef.triggerError();
			passwordRef.triggerError();
		} finally {
			busy = false;
		}
	}
</script>

<h1>Login</h1>
<p>Add your details below to get back into the app</p>
<form on:submit={signin}>
	<Input
		label="Email address:"
		type="email"
		bind:ref={emailRef}
		bind:value={email}
		required
		placeholder="e.g. alex@email.com"
		autocomplete="username"
	/>
	<Input
		label="Password:"
		type="password"
		bind:ref={passwordRef}
		bind:value={password}
		required
		placeholder="Enter your password"
		autocomplete="current-password"
	/>
	<Button type="submit" disabled={busy}>Login</Button>
</form>
<div class="auth-link-container">
	<p>Don't have an account?</p>
	<a href="{base}/create-account">Create account</a>
</div>
