<script>
	// @ts-nocheck
	import { todoTxt, filter } from '$lib/stores';
	import { ChevronsUpIcon } from 'svelte-feather-icons';

	let priority;

	todoTxt.subscribe((value) => {
		if (value)
			priority = value
				.items()
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

	function moscow(pri) {
		if (pri === 'A') return 'Must';
		if (pri === 'B') return 'Should';
		if (pri === 'C') return 'Could';
		return pri;
	}
</script>

<ChevronsUpIcon size="18"/>
{#if priority && priority.length > 0}
	{#each priority as pri}
		<button on:click={filterPriority(pri)} class={moscow(pri)}>{moscow(pri)}</button>
	{/each}
{/if}

<style>
	:root {
		--primary: #6c757d;
		--secondary: #adb5bd;
		--accent: #dee2e6;
	}
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
