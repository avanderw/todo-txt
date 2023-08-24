<script>
	// @ts-nocheck
	import { todoItems, status } from '$lib/stores';

	export let todo;

	function completeTask(todo) {
		todo.completeTask();
		$todoItems = $todoItems;
		$status = 'Todo completed';
	}

	function uncompleteTask(todo) {
		todo.uncompleteTask();
		$todoItems = $todoItems;
		$status = 'Todo uncompleted';
	}

    import { CheckCircleIcon, CircleIcon } from "svelte-feather-icons";
</script>

{#if todo.isComplete()}
	<button on:click={uncompleteTask(todo)}><CheckCircleIcon /></button>
{:else}
	<button on:click={completeTask(todo)}><CircleIcon /></button>
{/if}
