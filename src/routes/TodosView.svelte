<script>
	// @ts-nocheck
	import { todoItems, hide } from '$lib/stores';
	import Todo from './Todo.svelte';

</script>

<ul>
{#if $todoItems}
	{#each $todoItems as todo}
		{#if !$hide || !todo.isComplete()}
			<Todo {todo} />
		{/if}
	{/each}
{/if}
</ul>

<style>
	ul {
		list-style: none;
		padding: 0;
	}
</style>