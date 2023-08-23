<script>
	// @ts-nocheck
	import { file, todoItems } from '$lib/stores';

    function completeTask(todo) {
        todo.completeTask();
        $todoItems = $todoItems.sort((a, b) => a.render().localeCompare(b.render()));
    }

    function uncompleteTask(todo) {
        todo.uncompleteTask();
        $todoItems = $todoItems.sort((a, b) => a.render().localeCompare(b.render()));
    }
</script>

{#if $todoItems}
	<h1>{$file.name}</h1>
	<h2>Number of todos: {$todoItems.length}</h2>
	{#each $todoItems as todo}
		{#if todo.isComplete()}
			<button on:click={uncompleteTask(todo)}>uncomplete</button>
		{:else}
			<button on:click={completeTask(todo)}>complete</button>
		{/if}
		<p class:complete={todo.isComplete()}>{todo.render()}</p>
	{/each}
{/if}

<style>
	.complete {
		text-decoration: line-through;
	}
</style>
