<script>
	// @ts-nocheck
	import { file, todoTxt, todoItems, editTodo } from '$lib/stores';
	import TodoComplete from './TodoComplete.svelte';
	import TodoDelete from './TodoDelete.svelte';
</script>

{#if $todoItems}
	<h1>{$file.name}</h1>
	<h2>Showing {$todoItems.length} of {$todoTxt.length} todos</h2>
	{#each $todoItems as todo}
		<p>
			<TodoComplete {todo} />
			<button on:click={()=>{$editTodo = todo}} class:complete={todo.isComplete()}>{todo.render()}</button>
			<TodoDelete {todo} />
		</p>
	{/each}
{/if}

<style>
	.complete {
		text-decoration: line-through;
	}
</style>
