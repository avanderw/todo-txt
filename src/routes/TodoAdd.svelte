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
</script>

<form on:submit={addTodo}>
    <input type="text" bind:value />
    <button type="submit">add</button>
</form>