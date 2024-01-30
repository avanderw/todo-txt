<script>
	// @ts-nocheck
	import { todoTxt, todoItems, hide } from '$lib/stores';

	$: totalFilter = $todoItems ? $todoItems.length : 0;
	$: complete = $hide && $todoItems ? $todoItems.filter((t) => t.isComplete()).length : 0;
	$: total = $todoTxt ? $todoTxt.length : 0;
</script>

<button on:click={() => ($hide = !$hide)}>
	{#if $hide}
		<svg><use href="feather-sprite.svg#eye-off" /></svg> Done hidden
	{:else}
		<svg><use href="feather-sprite.svg#eye" /></svg> Done visible
	{/if}
</button>
Showing {totalFilter - complete} of {total} todos

<style>
	button {
		background: none;
		border: none;
		color: var(--primary-9);
		cursor: pointer;
		display: flex;
		align-items: center;
		font-size: 1rem;
		padding: 0.5rem;
		gap: 0.5rem;
	}
</style>