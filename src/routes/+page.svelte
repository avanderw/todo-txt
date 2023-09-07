<script>
	import OpenFile from './OpenFile.svelte';
	import StatusArea from './StatusArea.svelte';
	import TodosView from './TodosView.svelte';
	import FilterContexts from './FilterContexts.svelte';
	import FilterProjects from './FilterProjects.svelte';
	import FilterPriorities from './FilterPriorities.svelte';
</script>

<svelte:head>
	<title>todo.txt web editor</title>
</svelte:head>

<StatusArea />
<OpenFile />
<FilterPriorities />
<FilterContexts />
<FilterProjects />
<TodosView />
