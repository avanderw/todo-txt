<script>
    // @ts-nocheck
    import { todos } from '$lib/stores';
</script>

<h1>Todo List</h1>

{#if $todos}
    <p>Number of todos: {$todos.length}</p>
    {#each $todos.items() as todo}
        <p>{todo.render()}</p>
    {/each}
{/if}


