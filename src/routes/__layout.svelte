<script>
	// @ts-nocheck

	import '../styles/global.css';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/fb';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import Navbar from '$lib/Navbar.svelte';
	import { isLoggedIn } from './authStore';

	// isLoggedIn.subscribe(async () => {
	// 	console.log('subscribe', isLoggedIn);
	// 	if (!isLoggedIn) {
	// 		console.log('bad');
	// 		await goto('/login');
	// 	}
	// });
	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log('Welcome');
				isLoggedIn.update(() => true);
			} else {
				isLoggedIn.update(() => false);
				console.log('Goodby');
				goto('/login');
			}
		});
	});
</script>

<Navbar />
<slot />
