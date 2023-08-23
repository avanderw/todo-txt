<script>
	// @ts-nocheck
    import { todoItems, status } from '$lib/stores';

	export let todo;

	function completeTask(todo) {
		todo.completeTask();
        $todoItems = $todoItems;
        $status = "Todo completed";
	}

	function uncompleteTask(todo) {
		todo.uncompleteTask();
        $todoItems = $todoItems;
        $status = "Todo uncompleted";
	}
</script>

{#if todo.isComplete()}
	<button on:click={uncompleteTask(todo)}>uncomplete</button>
{:else}
	<button on:click={completeTask(todo)}>complete</button>
{/if}
