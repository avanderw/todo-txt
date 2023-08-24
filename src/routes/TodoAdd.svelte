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