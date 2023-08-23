<script>
	// @ts-nocheck
	import { todoItems, filter } from '$lib/stores';

	let contexts = [];

	todoItems.subscribe((value) => {
		if (value) contexts = value.map((todo) => todo.contexts()).flat();
	});

	function filterContext(context) {
		if ($filter && $filter.includes(context)) {
			$filter = $filter.replace(context, '');
            $filter = $filter.trim();
			return;
		}

		$filter = context;
	}
</script>

{#if contexts.length === 0}
	<p>No contexts found</p>
{:else}
	{#each contexts as context}
		<button on:click={filterContext(context)}>{context}</button>
	{/each}
{/if}
