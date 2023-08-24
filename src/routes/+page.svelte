<script>
	import OpenFile from './OpenFile.svelte';
	import StatusArea from './StatusArea.svelte';
	import TodoAdd from './TodoAdd.svelte';
	import TodosFilter from './TodosFilter.svelte';
	import TodosView from './TodosView.svelte';
	import FilterContexts from './FilterContexts.svelte';
	import FilterProjects from './FilterProjects.svelte';
	import FilterPriorities from './FilterPriorities.svelte';
</script>

<StatusArea />
<OpenFile />
<FilterPriorities />
<FilterContexts />
<FilterProjects />
<TodosFilter />
<TodoAdd />
<TodosView />
