<script>
	// @ts-nocheck
	import { todoTxt, todoItems, hide, andFilter } from '$lib/stores';

	let allProjects = [];
	todoTxt.subscribe((list) => {
		if (list) {
			allProjects = list
				.items()
				.map((todo) => todo.projects()) // get projects
				.filter((project) => project.length > 0) // remove empty projects
				.flat()
				.filter((project, index, self) => self.indexOf(project) === index); // remove duplicates
		}
	});

	let visibleProjects = [];
	todoItems.subscribe((items)=>{
		if (items) {
			visibleProjects = items
				.map((todo) => todo.projects()) // get projects
				.filter((project) => project.length > 0) // remove empty projects
				.flat()
				.filter((project, index, self) => self.indexOf(project) === index); // remove duplicates
		}
	});

	let hiddenProjects = [];
	hide.subscribe((value) => {
		if (value && $todoItems) {
			const incompleteProjects = $todoItems.filter((todo) => !todo.isComplete())
				.map((todo) => todo.projects()) // get projects
				.filter((project) => project.length > 0) // remove empty projects
				.flat()
				.filter((project, index, self) => self.indexOf(project) === index); // remove duplicates
			const completeProjects = $todoItems.filter((todo) => todo.isComplete())
				.map((todo) => todo.projects()) // get projects
				.filter((project) => project.length > 0) // remove empty projects
				.flat()
				.filter((project, index, self) => self.indexOf(project) === index); // remove duplicates
			const diffProjects = completeProjects.filter((project) => !incompleteProjects.includes(project));
			hiddenProjects = diffProjects;
		} else {
			hiddenProjects = [];
		}
	});

	$: projects = buildProjects(allProjects, visibleProjects, hiddenProjects);

	function buildProjects(allProjects, visibleProjects, hiddenProjects) {
		return allProjects.map((project) => {
			return {
				name: project,
				count: $todoItems.filter(t=>t.projects().indexOf(project) != -1).filter(t=>$hide ? !t.isComplete() : true).length,
				visible: visibleProjects.includes(project) && !hiddenProjects.includes(project),
				selected: $andFilter.toLowerCase().indexOf(project.toLowerCase()) >= 0
			};
		});
	}

	function toggleProjectFilter(project) {
		const projectRegex = new RegExp(`\\s*\\${project}\\s*`, 'i');
		let value = '';
		if (projectRegex.test($andFilter)) {
			value = projectRegex.exec($andFilter)[0];
			$andFilter = $andFilter.replace(value, ' ');
		}

		$andFilter = $andFilter.trim();
		if (value.indexOf(project) < 0) {
			$andFilter = $andFilter + ` ${project}`;
			$andFilter = $andFilter.trim();
		}
	}
</script>

<h2>+ Projects</h2>

{#if projects.length > 0}
	{#each projects as project}
		<button class:visible={project.visible} on:click={toggleProjectFilter(project.name)}>
			{#if project.selected}
				<svg><use href="feather-sprite.svg#check-square" /></svg>
			{:else}
				<svg><use href="feather-sprite.svg#square" /></svg>
			{/if}
			{project.name}:{project.count}
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
