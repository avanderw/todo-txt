<script>
	// @ts-nocheck
	import { file, todoItems } from '$lib/stores';
	import TodoComplete from './TodoComplete.svelte';
	import TodoDelete from './TodoDelete.svelte';

	todoItems.subscribe((value) => {
		if (value) {
			value.sort((a, b) => a.render().localeCompare(b.render()));
		}
	});
</script>

{#if $todoItems}
	<h1>{$file.name}</h1>
	<h2>Number of todos: {$todoItems.length}</h2>
	{#each $todoItems as todo}
		<p>
			<TodoComplete {todo} />
			<span class:complete={todo.isComplete()}>{todo.render()}</span>
			<TodoDelete {todo} />
		</p>
	{/each}
{/if}

<style>
	.complete {
		text-decoration: line-through;
	}
</style>
