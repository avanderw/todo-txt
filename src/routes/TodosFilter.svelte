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

	function cancelFilter(e) {
		if (e.key === 'Escape') {
			$filter = null;
		}
	}

	import { XCircleIcon } from 'svelte-feather-icons';
</script>

<form>
	<input type="text" on:keyup={cancelFilter} bind:value={$filter} disabled={!$todoTxt}/>
	<button on:click={() => ($filter = null)} disabled={!$filter}><XCircleIcon /></button>
</form>
