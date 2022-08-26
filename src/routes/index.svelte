<script>
	// @ts-nocheck
	import { app } from '$lib/fb';
	import { getFirestore, collection, setDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

	const db = getFirestore(app);
	const roomCol = collection(db, 'rooms');
	let arr = [];
	let roomName = '';

	async function getArr() {
		const querySnapshot = await getDocs(roomCol);
		querySnapshot.forEach((doc) => {
			arr = [...arr, doc.id];
		});
		console.log('Rooms are loaded');
	}
	getArr();
	async function addRoom(event) {
		if (
			(event.key !== 'Enter' && event.type !== 'click') ||
			!roomName ||
			arr.find((e) => e.name === roomName) !== undefined
		)
			return;
		arr = [...arr, roomName];
		const docRef = await setDoc(doc(db, `rooms/${roomName}`), {
			owner: 'some_owner'
		});
		await setDoc(doc(db, `rooms/${roomName}/PCs/RoomEnter`), {
			link: '',
			left_px: 100,
			top_px: 100
		});
		roomName = '';
		console.log('Room added');
	}
	async function removeRoom(elem) {
		arr = arr.filter((e) => e != elem);
		await deleteDoc(doc(db, 'rooms', `${elem}`));
		console.log('Document deleted with ID: ', elem);
	}
</script>

<button class="fitem" on:click={addRoom}>Add room</button>
<input
	class="fitem"
	type="text"
	placeholder="room name"
	bind:value={roomName}
	on:keydown={addRoom}
/>
<ul id="list-room">
	{#each arr as elem}
		<li class = "fitem">
			<a href="/{elem}">{elem}</a>
			<button on:click={removeRoom(elem)}>Delete</button>
		</li>
	{/each}
</ul>

<style>
	#list-room {
		list-style: decimal;
		margin-left: 30px;
	}
	.fitem {
		margin-top: 5px;
		margin-left: 10px;
	}
</style>
