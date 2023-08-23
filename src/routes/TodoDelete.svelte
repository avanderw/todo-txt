<script>
    // @ts-nocheck
    import { todoItems, todoTxt, status } from "$lib/stores";
    
    export let todo;

    function deleteTodo() {
        $todoTxt.removeItem(todo);
        $todoTxt = $todoTxt;
        $status = "Todo deleted";
    }
</script>
<button on:click={deleteTodo}>delete</button>