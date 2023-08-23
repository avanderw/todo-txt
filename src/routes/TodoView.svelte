<script>
    // @ts-nocheck
    import { file, todoItems } from '$lib/stores';
</script>

<h1>{$file.name}</h1>

{#if $todoItems}
    <h2>Number of todos: {$todoItems.length}</h2>
    {#each $todoItems as todo}
        <p>{todo.render()}</p>
    {/each}
{/if}


