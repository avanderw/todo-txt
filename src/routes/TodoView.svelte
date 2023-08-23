<script>
    // @ts-nocheck
    import { file, todoItems } from '$lib/stores';
</script>

{#if $todoItems}
    <h1>{$file.name}</h1>
    <h2>Number of todos: {$todoItems.length}</h2>
    {#each $todoItems as todo}
        <p class:complete={todo.isComplete()}>{todo.render()}</p>
    {/each}
{/if}

<style>
    .complete {
        text-decoration: line-through;
    }
</style>

