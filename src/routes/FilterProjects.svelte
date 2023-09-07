<script>
	// @ts-nocheck
	import { todoTxt, filter } from '$lib/stores';
	import { PlusIcon } from 'svelte-feather-icons';

	let projects = [];

	todoTxt.subscribe((value) => {
		if (value) projects = value.items().map((todo) => todo.projects()).flat();
	});

	function filterProjects(project) {
		if ($filter && $filter.includes(project)) {
			$filter = $filter.replace(project, '');
			$filter = $filter.trim();
			return;
		}

		$filter = project;
	}
</script>

<PlusIcon size="18" />
{#if projects.length > 0}
	{#each projects as project}
		<button on:click={filterProjects(project)}>{project}</button>
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