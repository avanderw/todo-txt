<script>
	// @ts-nocheck
	import { todoItems, filter } from '$lib/stores';

	let priority;

	todoItems.subscribe((value) => {
		if (value)
			priority = value
				.map((todo) => todo.priority())
				.filter((pri, index, array) => {
					return array.indexOf(pri) === index;
				})
                .filter((pri) => pri !== null)
				.flat();
	});

	function filterPriority(priority) {
        let pri = `(${priority})`;
		if ($filter && $filter.includes(pri)) {
			$filter = $filter.replace(pri, '');
			$filter = $filter.trim();
			return;
		}

		$filter = pri;
	}
</script>

{#if priority}
	{#each priority as pri}
		<button on:click={filterPriority(pri)}>{pri}</button>
	{/each}
{/if}
