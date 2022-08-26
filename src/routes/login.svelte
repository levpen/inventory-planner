<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { auth } from '$lib/fb';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	let email, password;
	const login = async () => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;
			localStorage.setItem('uid', user.uid);
			goto('/');
		} catch (error) {
			alert("Wrong password or user");
		}
		email = "";
		password = "";
	};
</script>

<div class="flexbox">
	<h1>Login</h1>
	<p>Email</p>
	<input type="text" bind:value={email} />
	<p>Password</p>
	<input type="password" bind:value={password} />
	<button on:click={login}>Continue</button>
</div>

<style>
	*{
		margin-top: 5px;
	}
	.flexbox {
		display: flex;
		flex-direction: column;
		padding: 10px;
		align-items: center;
	}
	button{
		width: 150px;
	}
</style>
