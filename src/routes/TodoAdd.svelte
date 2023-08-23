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

    function clearAdd(e) {
        if (e.key === "Escape") {
            value = "";
        }
    }
</script>

<form on:submit={addTodo}>
    <input type="text" on:keyup={clearAdd} bind:value />
    <button type="submit" disabled={!value}>add</button>
</form>