<script>
	// @ts-nocheck
	import { todoItems, filter } from '$lib/stores';

	let projects = [];

	todoItems.subscribe((value) => {
		if (value) projects = value.map((todo) => todo.projects()).flat();
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

{#each projects as project}
	<button on:click={filterProjects(project)}>{project}</button>
{/each}
