<script>
	import { goto } from '$app/navigation';
	import { auth } from './fb';
	import { signOut } from 'firebase/auth';
	import { isLoggedIn } from '../routes/authStore';

	async function logOut() {
		try {
			await signOut(auth);
			localStorage.removeItem('uid');
			goto('/login');
		} catch (error) {
			console.error(error);
		}
	}
</script>

<ul id="top-bar" class="flexbox">
	{#if $isLoggedIn}
		<li class="nav-item">
			<a href="/">Home</a>
		</li>
		<li class="nav-item">
			<a href="/" on:click|preventDefault={logOut}>Sign Out</a>
		</li>
	{/if}
</ul>

<style>
	#top-bar {
		background-color: gray;
		padding: 10px;
	}
	.nav-item {
		list-style: none;
		margin-left: 10px;
	}
	.flexbox {
		display: flex;
		justify-content: end;
	}
</style>
<!-- <ul class="nav justify-content-end">
	{#if $isLoggedIn}
		<li class="nav-item">
			<a class="nav-link" href="/">Home</a>
		</li>
		<li class="nav-item">
			<a class="nav-link" href="/" on:click|preventDefault={logOut}>Sign Out</a>
		</li>
	{/if}
</ul> -->
