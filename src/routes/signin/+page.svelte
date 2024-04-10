<script>
	import { signInWithEmailAndPassword } from '../../auth';

	let email = '';
	let password = '';

	async function signin() {
		await signInWithEmailAndPassword(email, password);
	}
</script>

<form on:submit={signin}>
	<label>Email:<input type="email" bind:value={email} required /></label>
	<label>Password:<input typE="password" bind:value={password} required /></label>
	<button type="submit">Sign in</button>
</form>
