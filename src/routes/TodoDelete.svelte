<script>
	// @ts-nocheck
	import { todoItems, todoTxt, status } from '$lib/stores';

	export let todo;

	function deleteTodo() {
		$todoTxt.removeItem(todo);
		$todoTxt = $todoTxt;
		$status = 'Todo deleted';
	}

	import { Trash2Icon } from 'svelte-feather-icons';
</script>

<button on:click={deleteTodo}><Trash2Icon size="18"/></button>

<style>
    button {
        border: none;
        background: none;
        cursor: pointer;
    }
</style>