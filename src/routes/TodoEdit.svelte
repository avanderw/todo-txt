<script>
	// @ts-nocheck
	import { editTodo, todoItems, status } from '$lib/stores';
	import { EditIcon } from 'svelte-feather-icons';

	const eventDispatcher = new EventTarget();

	let value;

	editTodo.subscribe((todo) => {
		value = todo ? todo.render() : null;
		if (value !== null) {
			eventDispatcher.dispatchEvent(new Event('update'));
		}
	});

	function updateTodo() {
		$editTodo.replaceWith(value);
		$todoItems = $todoItems;
		value = null;
		$editTodo = null;
		$status = 'Todo updated';
	}

	function cancelEdit(e) {
		if (e.key === 'Escape') {
			value = null;
			$editTodo = null;
		}
	}

	function focus(node) {
		function updateEvent(event) {
			node.disabled = false;
			node.focus();
		}

		eventDispatcher.addEventListener('update', updateEvent);

		return {
			destroy() {
				eventDispatcher.removeEventListener('update', updateEvent);
			}
		};
	}
</script>

<form on:submit={updateTodo}>
	<input use:focus type="text" on:keyup={cancelEdit} bind:value disabled={!$editTodo} />
	<button type="submit" disabled={!$editTodo}><EditIcon size="24" /></button>
</form>

<style>
	button {
		border: none;
		background: none;
		cursor: pointer;
	}
	form {
		display: flex;
		align-items: center;
		justify-content: right;
	}
	input {
		border: none;
		border-bottom: 1px solid #000;
		padding: 0.2rem;
		margin: 0.5rem 0;
		width: 90%;
	}
	input:disabled {
		background: #eee;
		border-bottom: 1px solid #ddd;
	}
</style>
