<script lang="ts">
	import { signInWithEmailAndPassword } from '$/auth';
	import Button from '$/components/Button.svelte';
	import Input, { type InputRef } from '$/components/Input.svelte';
	import { WrongCredentialsError } from '$/lib/errors';
	import { base } from '$app/paths';
	import type { HTMLInputAttributes } from 'svelte/elements';

	let email = '';
	let password = '';

	let emailRef: InputRef;
	let passwordRef: InputRef;

	let busy = false;

	async function signin() {
		busy = true;
		try {
			await signInWithEmailAndPassword({ email, password });
		} catch (ex) {
			password = '';
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
