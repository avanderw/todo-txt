<script>
	// @ts-nocheck

	import { todoItems } from '$lib/stores';
	import { ChevronUpIcon, ChevronDownIcon, XCircleIcon } from 'svelte-feather-icons';

	export let todo;

	function incrPri() {
		let priority = todo.priority();
		if (!priority) {
			todo.replaceWith(`(A) ${todo.render()}`);
		} else {
			let newPri = String.fromCharCode(priority.charCodeAt(0) + 1);
			if (newPri > 'Z') newPri = 'A';
			todo.replaceWith(`${todo.render().replace('(' + priority + ') ', '(' + newPri + ') ')}`);
		}
		$todoItems = $todoItems;
	}

	function rmPri() {
		let priority = todo.priority();
		if (priority) {
			todo.replaceWith(`${todo.render().replace('(' + priority + ') ', '')}`);
		}
		$todoItems = $todoItems;
	}

	function decrPri() {
		let priority = todo.priority();
		if (!priority) {
			todo.replaceWith(`(A) ${todo.render()}`);
		} else {
			let newPri = String.fromCharCode(priority.charCodeAt(0) - 1);
			if (newPri < 'A') newPri = 'Z';
			todo.replaceWith(`${todo.render().replace('(' + priority + ') ', '(' + newPri + ') ')}`);
		}
		$todoItems = $todoItems;
	}
</script>

<button on:click={decrPri}><ChevronUpIcon size="18" /></button>
<button on:click={incrPri}><ChevronDownIcon size="18" /></button>
<button on:click={rmPri}><XCircleIcon size="18" /></button>
