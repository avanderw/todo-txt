<script>
	// @ts-nocheck
	import { todoTxt, todoItems, hide, andFilter, notFilter } from '$lib/stores';

	let allPriority = [];
	todoTxt.subscribe((list) => {
		if (list) {
			allPriority = list
				.items()
				.map((todo) => todo.priority()) // get priority
				.filter((priority) => priority !== null) // remove empty priority
				.flat()
				.filter((project, index, self) => self.indexOf(project) === index); // remove duplicates
		}
	});

	let visiblePriority = [];
	todoItems.subscribe((items) => {
		if (items) {
			visiblePriority = items
				.map((todo) => todo.priority()) // get priority
				.filter((priority) => priority !== null) // remove empty priority
				.flat()
				.filter((project, index, self) => self.indexOf(project) === index); // remove duplicates
		}
	});

	let hiddenPriority = [];
	hide.subscribe((value) => {
		if (value && $todoItems) {
			const incompletePriority = $todoItems
				.filter((todo) => !todo.isComplete())
				.map((todo) => todo.priority()) // get priority
				.filter((priority) => priority !== null) // remove empty priority
				.flat()
				.filter((project, index, self) => self.indexOf(project) === index); // remove duplicates
			const completePriority = $todoItems
				.filter((todo) => todo.isComplete())
				.map((todo) => todo.priority()) // get priority
				.filter((priority) => priority !== null) // remove empty priority
				.flat()
				.filter((project, index, self) => self.indexOf(project) === index); // remove duplicates
			const diffPriority = completePriority.filter(
				(project) => !incompletePriority.includes(project)
			);
			hiddenPriority = diffPriority;
		} else {
			hiddenPriority = [];
		}
	});

	$: priority = buildPriority(allPriority, visiblePriority, hiddenPriority);

	function buildPriority(allPriority, visiblePriority, hiddenPriority) {
		return allPriority.map((priority) => {
			return {
				name: priority,
				count: $todoItems
					.filter((t) => t.priority() === priority)
					.filter((t) => ($hide ? !t.isComplete() : true)).length,
				visible: visiblePriority.includes(priority) && !hiddenPriority.includes(priority),
				selected: $andFilter.toLowerCase().indexOf(`(${priority.toLowerCase()})`) >= 0
			};
		});
	}

	function togglePriorityFilter(priority) {
		let priState = 'none';
		priState =
			$andFilter.toLowerCase().indexOf(`(${priority.toLowerCase()})`) >= 0 ? 'include' : priState;
		priState =
			$notFilter.toLowerCase().indexOf(`(${priority.toLowerCase()})`) >= 0 ? 'exclude' : priState;

		switch (priState) {
			case 'include':
				$andFilter = $andFilter.replace(`(${priority})`, ' ');
				$notFilter = $notFilter + ` (${priority})`;
				break;
			case 'exclude':
				$notFilter = $notFilter.replace(`(${priority})`, ' ');
				break;
			case 'none':
				const priorityRegex = /\s*\([A-Z]\)\s*/i;
				while (priorityRegex.test($andFilter)) {
					const value = priorityRegex.exec($andFilter)[0];
					$andFilter = $andFilter.replace(value, ' ');
				}
				$andFilter = $andFilter + ` (${priority})`;
				break;
		}
		$andFilter = $andFilter.trim();
		$notFilter = $notFilter.trim();
	}
</script>

<h2>() Priority</h2>

{#if priority && priority.length > 0}
	{#each priority as pri}
		<button class:visible={pri.visible} on:click={togglePriorityFilter(pri.name)}>
			{#if pri.selected}
				<svg><use href="feather-sprite.svg#check-square" /></svg>
			{:else if $notFilter.indexOf(`(${pri.name})`) >= 0}
				<svg><use href="feather-sprite.svg#x-square" /></svg>
			{:else}
				<svg><use href="feather-sprite.svg#square" /></svg>
			{/if}
			({pri.name}):{pri.count}
		</button>
	{/each}
{/if}

<style>
	h2 {
		margin: 0.5rem 0.25rem;
	}
	button {
		font-size: inherit;
		display: inline-flex;
		gap: 0.25rem;
		align-items: center;
		color: var(--primary-4);
		background: none;
		border: none;
	}
	button.visible {
		color: var(--secondary-6);
	}
</style>
