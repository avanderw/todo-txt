<script>
	import OpenFile from './File.svelte';
	import StatusArea from './Status.svelte';
	import TodosView from './TodosView.svelte';
	import FilterContexts from './Contexts.svelte';
	import FilterProjects from './Projects.svelte';
	import FilterPriorities from './Priorities.svelte';
	import ShortcutKeys from './Shortcuts.svelte';
	import Sort from './Sort.svelte';
	import HeaderLinks from './HeaderLinks.svelte';
	import FooterLinks from './FooterLinks.svelte';
	import Filter from './Filter.svelte';
</script>

<svelte:head>
	<title>todo.txt editor</title>
</svelte:head>

<HeaderLinks />

<StatusArea />
<OpenFile />
<Sort />

<div class="two-column">
	<div>
		<TodosView />
	</div>
	<div>
		<FilterPriorities />
		<FilterProjects />
		<FilterContexts />
		<Filter />
	</div>
</div>

<ShortcutKeys />

<FooterLinks />

<style>
	.two-column {
		display: flex;
		flex-wrap: wrap;
		gap: 2%;
	}
	.two-column > *:nth-child(1) {
		width: 69%;
	}
	.two-column > *:nth-child(2) {
		width: 29%;
	}

	@media (orientation: portrait) {
		.two-column > *:nth-child(1) {
			width:100%;
			order: 1;
		}
		.two-column > *:nth-child(2) {
			width:100%;
			order: -1;
		}
	}
</style>
