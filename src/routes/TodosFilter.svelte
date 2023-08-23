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
</script>

<form>
	<span>filter</span> <input type="text" bind:value={$filter} />
	{#if $filter}
		<button on:click={() => ($filter = null)}>clear filter</button>
	{/if}
</form>
