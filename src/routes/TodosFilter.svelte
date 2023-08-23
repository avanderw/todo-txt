<script>
	//@ts-nocheck
    import { todoItems, todoTxt, filter } from '$lib/stores';

    function filterItems() {
        $todoItems = $todoTxt.items().filter((item) => item.render().includes($filter));
    }

    function clearFilter() {
        $filter = null;
        $todoItems = $todoTxt.items();
    }
</script>

<input on:keyup={filterItems} type="text" bind:value={$filter} />
{#if $filter}
	<button on:click={clearFilter}>clear filter</button>
{/if}
