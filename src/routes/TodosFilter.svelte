<script>
	//@ts-nocheck
	import { todoItems, todoTxt, filter } from '$lib/stores';

	function filterTodos(value) {
		if ($todoTxt) {
			if (value) {
				$todoItems = $todoTxt.items().filter((item) => item.render().includes($filter));
			} else {
				$todoItems = $todoTxt.items();
			}
		}
	}

	filter.subscribe((value) => {
		filterTodos(value);
	});

	todoTxt.subscribe((value) => {
		filterTodos($filter);
	});

    function clearFilter(e) {
        if (e.key === "Escape") {
            $filter = null;
        }
    }
</script>

<form>
	<span>filter</span> <input type="text" on:keyup={clearFilter} bind:value={$filter} />
	{#if $filter}
		<button on:click={() => ($filter = null)}>clear filter</button>
	{/if}
</form>
