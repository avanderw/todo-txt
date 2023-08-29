<script>
    // @ts-nocheck
    import { todoTxt, status } from '$lib/stores';

    let value = "";

    function addTodo() {
        $todoTxt.addItem(value);
        $todoTxt = $todoTxt;
        value = "";
        $status = "Todo added";
    }

    function cancelAdd(e) {
        if (e.key === "Escape") {
            value = "";
        }
    }

    import { PlusCircleIcon } from 'svelte-feather-icons';
</script>

<form on:submit={addTodo}>
    <input type="text" on:keyup={cancelAdd} bind:value disabled={!$todoTxt} />
    <button type="submit" disabled={!value}><PlusCircleIcon /></button>
</form>

<style>
	button {
		border: none;
		background: none;
		cursor: pointer;
	}
    form {
        display: flex;
        align-items: center;
        justify-content: right;
    }
    input {
        border: none;
        border: 1px solid #000;
        padding: 0.2rem;
        margin: 0.5rem 0;
        width: 90%;
    }
    input:disabled {
        background: #eee;
        border-bottom: 1px solid #ddd;
    }
</style>