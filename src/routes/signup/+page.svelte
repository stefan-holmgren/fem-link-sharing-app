<script>
	import { signUpWithEmailAndPassword } from '../../auth';

	let email = '';
	let password = '';

	async function signup() {
		await signUpWithEmailAndPassword(email, password);
	}
</script>

<form on:submit={signup}>
	<label>Email:<input type="email" bind:value={email} required /></label>
	<label>Password:<input typE="password" bind:value={password} required /></label>
	<button type="submit">Sign up</button>
</form>
