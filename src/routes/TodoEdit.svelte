<script>
	// @ts-nocheck
	import { editTodo, todoItems, status } from '$lib/stores';

    let value;

    editTodo.subscribe((todo) => {
        value = todo ? todo.render() : null;
    });

    function updateTodo() {
        $editTodo.replaceWith(value);
        $todoItems = $todoItems;
        value = null;
        $editTodo = null;
        $status = "Todo updated";
    }

    function cancelEdit(e) {
        if (e.key === "Escape") {
            value = null;
            $editTodo = null;
        }
    }

    import {EditIcon} from "svelte-feather-icons";
</script>

<form on:submit={updateTodo}>
	<input type="text" on:keyup={cancelEdit} bind:value disabled={!$editTodo}/> <button type="submit" disabled={!$editTodo}><EditIcon /></button>
</form>
