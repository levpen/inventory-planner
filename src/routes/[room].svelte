<script>
	// @ts-nocheck
	import Draggable from '$lib/Draggable.svelte';
	import { app } from '$lib/fb';
	import { page } from '$app/stores';
	import {
		getFirestore,
		collection,
		getDocs,
		updateDoc,
		setDoc,
		doc,
		deleteDoc
	} from 'firebase/firestore';

	const db = getFirestore(app);
	const roomName = $page.url.pathname.substring(1);
	const pcsCol = collection(db, `rooms/${roomName}/PCs`);
	let arr = [];
	let PClink = '',
		PCname = '';

	async function loadData() {
		const querySnapshot = await getDocs(pcsCol);
		querySnapshot.forEach((doc) => {
			arr = [
				...arr,
				{
					left_px: doc.data().left_px,
					top_px: doc.data().top_px,
					link: doc.data().link,
					name: doc.id
				}
			];
		});
		console.log('Initial array: ', arr);
	}
	loadData();
	async function addElem(event) {
		if (event.key !== 'Enter' || !PClink || !PCname) return;
		let curPC = { left_px: 200, top_px: 200, link: PClink, name: PCname };
		arr = [...arr, curPC];
		await setDoc(doc(db, `rooms/${roomName}/PCs/${PCname}`), {
			link: curPC.link,
			left_px: curPC.left_px,
			top_px: curPC.top_px
		});
		PClink = '';
		PCname = '';
		console.log('PC added', arr);
	}
	async function removeElem(pc) {
		let cool = confirm('Are you sure?');
		if(!cool)
			return;
		arr = arr.filter((e) => e.name !== pc.name);
		await deleteDoc(doc(db, `rooms/${roomName}/PCs/${pc.name}`));
		console.log('PC removed', arr);
	}
	async function changePos(event) {
		let pc = event.detail.pc;
		pc.left_px = event.detail.left_px;
		pc.top_px = event.detail.top_px;
		await updateDoc(doc(db, `rooms/${roomName}/PCs/${pc.name}`), {
			left_px: pc.left_px,
			top_px: pc.top_px
		});
		console.log('position updated', arr);
	}
</script>

<div id="top-bar">
	<h1>Room name: {roomName}</h1>
	<input
		type="text"
		placeholder="input a name of PC"
		id="name-input"
		bind:value={PCname}
		on:keydown={addElem}
	/>
	<input
		type="text"
		placeholder="input a link to exe"
		id="link-input"
		bind:value={PClink}
		on:keydown={addElem}
	/>
	<a href="/">Home</a>
</div>

{#each arr as item}
	<Draggable left={item.left_px} top={item.top_px} pc={item} on:positionChange={changePos}>
		<a href={item.link}>{item.link}</a>
		<p>{item.name}</p>
		<button class="btn btn-primary" on:click={removeElem(item)}>Delete</button>
	</Draggable>
{/each}

<style>
	#top-bar {
		background-color: grey;
		padding: 10px;
	}
</style>
