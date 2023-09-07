<script>
	// @ts-nocheck
	import { todoTxt, todoItems, editTodo, filter } from '$lib/stores';
	import FileInfo from './FileInfo.svelte';
	import Priority from './Priority.svelte';
	import TodoAdd from './TodoAdd.svelte';
	import TodoComplete from './TodoComplete.svelte';
	import TodoDelete from './TodoDelete.svelte';
	import TodoEdit from './TodoEdit.svelte';

	let hide = true;

	import { EyeIcon, EyeOffIcon } from 'svelte-feather-icons';
	import TodosFilter from './TodosFilter.svelte';

	$: totalFilter = $todoItems ? $todoItems.length : 0;
	$: complete = (hide && $todoItems ? $todoItems.filter((t) => t.isComplete()).length : 0);
	$: total = $todoTxt ? $todoTxt.length : 0;
</script>

<table cellspacing="0">
	<thead
		><tr
			><th colspan="2" style="text-align: left;"
				>Showing {totalFilter - complete} of
				{total} todos
				<button on:click={() => (hide = !hide)}>
					{#if hide}
						<EyeOffIcon size="18" />
					{:else}
						<EyeIcon size="18" />
					{/if}
				</button>
			</th><th colspan="2"><TodosFilter /></th></tr
		></thead
	>
	<tr style="background-color: #fff;"><td colspan="4"> <TodoAdd /></td></tr>
	{#if $todoItems}
	{#each $todoItems as todo}
		{#if !hide || !todo.isComplete()}
			<tr>
				<td> <TodoComplete {todo} /></td>
				<td
					><button
						on:click={() => {
							$editTodo = todo;
						}}
						class:complete={todo.isComplete()}>{todo.render()}</button
					></td
				>
				<td>
					<TodoDelete {todo} />
				</td>
				<td><Priority {todo} /></td>
			</tr>
		{/if}
	{/each}
	{/if}
	{#if $todoItems && $todoItems.length === 0}
		<tr>
			<td colspan="4" style="text-align: center; background-color: #fff;"
				>No todos
				{#if $filter}<button on:click={() => ($filter = null)}>clear filter</button>{/if}</td
			>
		</tr>
	{/if}
	<tr style="background-color: #fff;"><td colspan="4"><TodoEdit /></td></tr>
	<tfoot
		><tr style="text-align:right"><th colspan="4" style="padding: 1em 0"><FileInfo /></th></tr
		></tfoot
	>
</table>

<style>
	table {
		min-width: 33%;
		border-collapse: collapse;
	}
	button {
		border: none;
		background: none;
		cursor: pointer;
		text-align: left;
	}
	tr:nth-child(even) {
		background-color: #f2f2f2;
	}
	.complete {
		text-decoration: line-through;
	}
</style>
