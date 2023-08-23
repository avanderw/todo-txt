<script>
	// @ts-nocheck
	import { editTodo, todoItems } from '$lib/stores';

    let value;

    editTodo.subscribe((todo) => {
        value = todo ? todo.render() : null;
    });

    function updateTodo() {
        $editTodo.replaceWith(value);
        $todoItems = $todoItems;
        value = null;
        $editTodo = null;
    }
</script>

<form on:submit={updateTodo}>
	<input type="text" bind:value /> <button type="submit" disabled={!$editTodo}>save</button>
</form>
