<script>
	// @ts-nocheck
	import { todoTxt, todoItems, editTodo } from '$lib/stores';
	import TodoComplete from './TodoComplete.svelte';
	import TodoDelete from './TodoDelete.svelte';

	let hide = true;

	import { EyeIcon, EyeOffIcon } from 'svelte-feather-icons';
</script>

{#if $todoItems}
	<h2>
		Showing {$todoItems.length - (hide ? $todoItems.filter((t) => t.isComplete()).length : 0)} of {$todoTxt.length}
		todos ({$todoItems.filter((t) => t.isComplete()).length} complete
		<button on:click={() => (hide = !hide)}>
			{#if hide}
				<EyeOffIcon />
			{:else}
				<EyeIcon />
			{/if}
		</button>)
	</h2>
	{#each $todoItems as todo}
		{#if !hide || !todo.isComplete()}
			<p>
				<TodoComplete {todo} />
				<button
					on:click={() => {
						$editTodo = todo;
					}}
					class:complete={todo.isComplete()}>{todo.render()}</button
				>
				<TodoDelete {todo} />
			</p>
		{/if}
	{/each}
{/if}

<style>
	button {
		border: none;
		background: none;
		cursor: pointer;
	}
	.complete {
		text-decoration: line-through;
	}
</style>
