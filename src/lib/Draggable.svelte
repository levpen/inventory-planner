<script>
	// @ts-nocheck
	import { createEventDispatcher } from 'svelte';
	export let left = 100;
	export let top = 100;
	export let pc;
	const dispatch = createEventDispatcher();

	let moving = false;

	function onMouseDown() {
		moving = true;
	}

	function onMouseMove(e) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;
		}
	}

	function onMouseUp() {
		moving = false;
		dispatch('positionChange', {
			left_px: left,
			top_px: top,
			pc: pc
		})
	}
</script>

<section on:mousedown={onMouseDown} style="left: {left}px; top: {top}px;" class="draggable">
	<slot />
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
	.draggable {
		padding: 20px;
		user-select: none;
		cursor: move;
		position: absolute;
		background-color: #f1f1f1;
		border: 1px solid #d3d3d3;
		text-align: center;
	}
</style>
