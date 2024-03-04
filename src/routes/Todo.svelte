<script>
	// @ts-nocheck
	import { todoTxt, todoItems } from '$lib/stores';
	import { removePri } from '$lib/todotxt-util';
	import { isRecur, recurDue } from '$lib/todotxt-addon';
	import { TodoTxt } from '$lib/todotxt';
	import Habits from './Habits.svelte';

	export let todo;

	function deleteTodo() {
		$todoTxt.removeItem(todo);
		$todoTxt = $todoTxt;
        $todoItems = $todoItems;
	}

	let value;
	let editing = false;
    function startEdit() {
        editing = true;
        value = todo.render();
    }
	function editTodo() {
		todo.replaceWith(value);
		editing = false;
	}

	function completeTodo() {
		if (isRecur(todo)) {
			const newDue = recurDue(todo.addons().due);
			const newTodo = TodoTxt.parseLine(todo.render());
			newTodo.setAddOn('due', newDue);
			$todoTxt.addItem(newTodo);
			$todoTxt = $todoTxt;
		}

		if (todo.priority()) {
			todo.replaceWith(removePri(todo));
		}

		todo.completeTask();
		$todoItems = $todoItems;
	}

	function uncompleteTodo() {
		todo.uncompleteTask();
		$todoItems = $todoItems;
	}

	function againTodo() {
		const newTodo = TodoTxt.parseLine(todo.render());
		newTodo.setCreatedDate(new Date().toISOString());
		$todoTxt.addItem(newTodo);
		$todoTxt = $todoTxt;
		completeTodo();
	}
</script>

<li>
	<div>
	{#if todo.isComplete()}
		<button on:click={uncompleteTodo} class="complete"><svg><use href="feather-sprite.svg#check-circle" /></svg></button>
	{:else}
		<button on:click={completeTodo} class="complete"><svg><use href="feather-sprite.svg#circle" /></svg></button>
	{/if}

	<button on:click={againTodo(todo)}><svg><use href="feather-sprite.svg#repeat" /></button>
	<button on:click={deleteTodo}><svg><use href="feather-sprite.svg#trash-2" /></svg></button>
	{#if editing}
		<form on:submit={editTodo}>
			<input
				type="text"
				bind:value
				autofocus
				on:keyup={(e) => {
					if (e.key === 'Escape') {
						editing = false;
                        value = todo.render();
					}
				}}
			/>
		</form>
	{:else}
		<button on:click={startEdit} class="raw">{todo.render()}</button>
	{/if}
	</div>
	<Habits {todo} />
</li>

<style>
    form {
        display: inline;
    }

    li {
        list-style: none;
        display: flex;
		justify-content: space-between;
    }
    li:nth-child(even) {
        background: var(--primary-2);
    }

	div {
        list-style: none;
        display: flex;
		width:80%;
	}

    button.raw {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
    }
    button {
        font-size: inherit;
        color: var(--primary-9);
        background: none;
        border: none;
    }
	form {
		width: 100%;
	}
	input {
		font-size: inherit;
		width: 100%;
		border: none;
	}
</style>
