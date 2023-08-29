<script>
	// @ts-nocheck
	import { todoTxt, filter } from '$lib/stores';

	let contexts = [];

	todoTxt.subscribe((value) => {
		if (value) contexts = value.items().map((todo) => todo.contexts()).flat();
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

{#if contexts.length > 0}
	<p>
		{#each contexts as context}
			<button on:click={filterContext(context)}>{context}</button>
		{/each}
	</p>
{/if}
