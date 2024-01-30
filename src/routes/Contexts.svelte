<script>
	// @ts-nocheck
	import { todoTxt, todoItems, hide, andFilter } from '$lib/stores';

	let allContexts = [];
	todoTxt.subscribe((list) => {
		if (list) {
			allContexts = list
				.items()
				.map((todo) => todo.contexts()) // get contexts
				.filter((priority) => priority !== null) // remove empty contexts
				.flat()
				.filter((project, index, self) => self.indexOf(project) === index); // remove duplicates
		}
		console.log(allContexts);
	});

	let visibleContexts = [];
	todoItems.subscribe((items) => {
		if (items) {
			visibleContexts = items
				.map((todo) => todo.contexts()) // get contexts
				.filter((priority) => priority !== null) // remove empty contexts
				.flat()
				.filter((project, index, self) => self.indexOf(project) === index); // remove duplicates
		}
	});
	
	
	let hiddenContexts = [];
	hide.subscribe((value) => {
		if (value && $todoItems) {
			const incompletePriority = $todoItems.filter((todo) => !todo.isComplete())
				.map((todo) => todo.contexts()) // get contexts
				.filter((priority) => priority !== null) // remove empty contexts
				.flat()
				.filter((project, index, self) => self.indexOf(project) === index); // remove duplicates
			const completePriority = $todoItems.filter((todo) => todo.isComplete())
				.map((todo) => todo.contexts()) // get contexts
				.filter((priority) => priority !== null) // remove empty contexts
				.flat()
				.filter((project, index, self) => self.indexOf(project) === index); // remove duplicates
			const diffPriority = completePriority.filter((project) => !incompletePriority.includes(project));
			hiddenContexts = diffPriority;
		} else {
			hiddenContexts = [];
		}
	});

	$: contexts = buildContexts(allContexts, visibleContexts, hiddenContexts);

	function buildContexts(allContexts, visibleContexts, hiddenContexts) {
		return allContexts.map((context) => {
			return {
				name: context,
				visible: visibleContexts.includes(context) && !hiddenContexts.includes(context),
				selected: $andFilter.toLowerCase().indexOf(context.toLowerCase()) >= 0
			};
		});
	}
	

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
	
	function toggleContextFilter(context) {
		const contextRegex = new RegExp(`\\s*${context}\\s*`, 'i');
		let value = '';
		if (contextRegex.test($andFilter)) {
			value = contextRegex.exec($andFilter)[0];
			$andFilter = $andFilter.replace(value, ' ');
		}

		$andFilter = $andFilter.trim();
		if (value.indexOf(context) < 0) {
			$andFilter = $andFilter + ` ${context}`;
			$andFilter = $andFilter.trim();
		}
	}
</script>

<h2>@ Contexts</h2>
{#if contexts.length > 0}
	{#each contexts as context}
		<button class:visible={context.visible} on:click={toggleContextFilter(context.name)}>
			{#if context.selected}
				<svg><use href="feather-sprite.svg#check-square" /></svg>
			{:else}
				<svg><use href="feather-sprite.svg#square" /></svg>
			{/if}
			{context.name}
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
		color: var(--secondary-8);
	}
</style>
