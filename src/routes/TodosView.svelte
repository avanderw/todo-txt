<script>
	// @ts-nocheck
	import { todoTxt, todoItems, editTodo } from '$lib/stores';
	import FileInfo from './FileInfo.svelte';
	import TodoComplete from './TodoComplete.svelte';
	import TodoDelete from './TodoDelete.svelte';

	let hide = true;

	import { EyeIcon, EyeOffIcon } from 'svelte-feather-icons';
</script>

{#if $todoItems}
	<table cellspacing="0">
		<thead
			><tr
				><th colspan="3" style="text-align: left; padding: 1em 0;"
					>Showing {$todoItems.length -
						(hide ? $todoItems.filter((t) => t.isComplete()).length : 0)} of
					{$todoTxt.length}
					todos (<button on:click={() => (hide = !hide)}>
						{#if hide}
							<EyeOffIcon size="18" />
						{:else}
							<EyeIcon size="18" />
						{/if}
					</button>{$todoItems.filter((t) => t.isComplete()).length} complete)</th
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
				</tr>
			{/if}
		{/each}
		<tfoot><tr style="text-align:right"><th colspan="3" style="padding: 1em 0"><FileInfo /></th></tr></tfoot>
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
