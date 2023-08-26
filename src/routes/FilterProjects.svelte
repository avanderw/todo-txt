<script>
	// @ts-nocheck
	import { todoTxt, filter } from '$lib/stores';

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

{#if projects.length > 0}
	<p>Projects:
	{#each projects as project}
		<button on:click={filterProjects(project)}>{project}</button>
	{/each}
    </p>
{/if}
