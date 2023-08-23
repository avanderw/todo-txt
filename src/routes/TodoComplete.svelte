<script>
	// @ts-nocheck
    import { todoItems } from '$lib/stores';

	export let todo;

	function completeTask(todo) {
		todo.completeTask();
        $todoItems = $todoItems;
	}

	function uncompleteTask(todo) {
		todo.uncompleteTask();
        $todoItems = $todoItems;
	}
</script>

{#if todo.isComplete()}
	<button on:click={uncompleteTask(todo)}>uncomplete</button>
{:else}
	<button on:click={completeTask(todo)}>complete</button>
{/if}
