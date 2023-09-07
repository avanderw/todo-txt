<script>
	// @ts-nocheck
	import { todoTxt, filter } from '$lib/stores';
	import { AtSignIcon } from 'svelte-feather-icons';

	let contexts = [];

	todoTxt.subscribe((value) => {
		if (value)
			contexts = value
				.items()
				.map((todo) => todo.contexts())
				.filter((context) => context.length > 0)
				.flat()
				.filter((context, index, self) => self.indexOf(context) === index);
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

<AtSignIcon size="18" />
{#if contexts.length > 0}
	{#each contexts as context}
		<button on:click={filterContext(context)}>{context}</button>
	{/each}
{/if}

<style>
	button + button {
		margin-left: 0.15rem;
	}
	button {
		border: none;
		border-radius: 0.2rem;
		background-color: var(--primary);
		color: var(--accent);
		cursor: pointer;
		padding: 0.15rem 0.3rem;
		margin-left: 0.5rem;
	}
</style>