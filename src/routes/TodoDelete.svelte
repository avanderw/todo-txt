<script>
    // @ts-nocheck
    import { todoItems, todoTxt } from "$lib/stores";
    
    export let todo;

    function deleteTodo() {
        $todoTxt.removeItem(todo);
        $todoItems = $todoTxt.items().sort((a, b) => a.render().localeCompare(b.render()));
    }
</script>
<button on:click={deleteTodo}>delete</button>