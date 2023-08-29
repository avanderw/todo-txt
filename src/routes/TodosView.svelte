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
</script>

{#if $todoItems}
	<table cellspacing="0">
		<thead
			><tr
				><th colspan="4" style="text-align: left;"
					>Showing {$todoItems.length -
						(hide ? $todoItems.filter((t) => t.isComplete()).length : 0)} of
					{$todoTxt.length}
					todos (<button on:click={() => (hide = !hide)}>
						{#if hide}
							<EyeOffIcon size="18" />
						{:else}
							<EyeIcon size="18" />
						{/if}
					</button>{$todoItems.filter((t) => t.isComplete()).length} complete)
					<TodoEdit /></th
				></tr
			></thead
		>
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
		{#if $todoItems.length === 0}
			<tr>
				<td colspan="4" style="text-align: center; background-color: #fff;"
					>No todos
					{#if $filter}<button on:click={() => ($filter = null)}>clear filter</button>{/if}</td
				>
			</tr>
		{/if}
		<tr><td colspan="4" style="background-color:white"> <TodoAdd /></td></tr>
		<tfoot
			><tr style="text-align:right"><th colspan="3" style="padding: 1em 0"><FileInfo /></th></tr
			></tfoot
		>
	</table>
{/if}

<style>
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
