<script>
    // @ts-nocheck
    import { todoItems, todoTxt, filter } from '$lib/stores';

    let value = "";

    function addTodo() {
        $todoTxt.addItem(value);
        $todoTxt = $todoTxt;
        $todoItems = $todoTxt.items().sort((a, b) => a.render().localeCompare(b.render()));
        $filter = null;
        value = "";
    }
</script>

<form on:submit={addTodo}>
    <input type="text" bind:value />
    <button type="submit">add</button>
    
</form>