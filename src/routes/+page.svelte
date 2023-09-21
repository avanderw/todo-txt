<script>
	import OpenFile from './OpenFile.svelte';
	import StatusArea from './StatusArea.svelte';
	import TodosView from './TodosView.svelte';
	import FilterContexts from './FilterContexts.svelte';
	import FilterProjects from './FilterProjects.svelte';
	import FilterPriorities from './FilterPriorities.svelte';
	import ShortcutKeys from './ShortcutKeys.svelte';
</script>

<svelte:head>
	<title>todo.txt web editor</title>
</svelte:head>

<div class="container">
	<StatusArea />
	<OpenFile />

	<div><FilterPriorities /></div>
	<div><FilterContexts /></div>
	<div><FilterProjects /></div>

	<TodosView />
	<ShortcutKeys />
</div>

<style>
	div {
		/** valign to center */
		display: flex;
		align-items: center;
		margin: 0.5rem 0;
	}

	.container {
		display: block;
		width: fit-content;
		margin: 0 auto;
	}
</style>
