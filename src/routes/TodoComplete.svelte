<script>
	// @ts-nocheck

	import { todoItems, status, todoTxt } from '$lib/stores';
	import { TodoTxt } from '$lib/todotxt';

	export let todo;

	function completeTask(todo) {
		if (isRecur(todo)) {
			const newTodo = TodoTxt.parseLine(todo.render());
			const [date, recur] = todo.addons().due.split('R');
			const newDate = updateDateWithRecurrence(date, recur);
			newTodo.setAddOn('due', newDate + 'R' + recur);
			$todoItems.push(newTodo);
			$todoTxt.addItem(newTodo);
		}
		todo.completeTask();
		$todoItems = $todoItems;
		$status = 'Todo completed';
	}

	function isRecur(todo) {
		for (let key in todo.addons()) {
			if (key === 'due') {
				return todo.addons()[key].includes('R');
			}
		}
		return false;
	}

	function updateDateWithRecurrence(inputDate, recurrence) {
		if (inputDate === undefined || recurrence === undefined) {
			throw new Error(`Invalid input date (${inputDate}) or recurrence (${recurrence})`);
		}
		const dateParts = inputDate.split('-');
		const year = parseInt(dateParts[0], 10);
		const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based
		const day = parseInt(dateParts[2], 10);
		const date = new Date(year, month, day);

		const regex = /(.*)(\d+)(\w)/;
		const match = recurrence.match(regex);
		if (!match) {
			throw new Error('Invalid recurrence format');
		}

		const operator = match[1];
		const value = parseInt(match[2], 10);
		const unit = match[3];

		let newDate = new Date(date);

		switch (unit) {
			case 'd':
				switch (operator) {
					case '+':
						newDate.setDate(date.getDate() + value);
						break;
					case '.+':
						newDate.setDate(new Date(Date.now()).getDate() + value);
						break;
					case '++':
						newDate.setDate(newDate.getDate() + value);
						while (newDate < Date.now()) {
							newDate.setDate(newDate.getDate() + value);
						}
						break;
					default:
						throw new Error('Invalid recurrence operator');
				}
				break;
			case 'w':
				switch (operator) {
					case '+':
						newDate.setDate(date.getDate() + value * 7);
						break;
					case '.+':
						newDate.setDate(new Date(Date.now()).getDate() + value * 7);
						break;
					case '++':
						newDate.setDate(newDate.getDate() + value * 7);
						while (newDate < Date.now()) {
							newDate.setDate(newDate.getDate() + value * 7);
						}
						break;
					default:
						throw new Error('Invalid recurrence operator');
				}
				break;
			case 'm':
				switch (operator) {
					case '+':
						newDate.setMonth(date.getMonth() + value);
						break;
					case '.+':
						newDate.setMonth(new Date(Date.now()).getMonth() + value);
						break;
					case '++':
						newDate.setMonth(newDate.getMonth() + value);
						while (newDate < Date.now()) {
							newDate.setMonth(newDate.getMonth() + value);
						}
						break;
					default:
						throw new Error('Invalid recurrence operator');
				}
				break;
			case 'y':
				switch (operator) {
					case '+':
						newDate.setFullYear(date.getFullYear() + value);
						break;
					case '.+':
						newDate.setFullYear(new Date(Date.now()).getFullYear() + value);
						break;
					case '++':
						newDate.setFullYear(newDate.getFullYear() + value);
						while (newDate < Date.now()) {
							newDate.setFullYear(newDate.getFullYear() + value);
						}
						break;
					default:
						throw new Error('Invalid recurrence operator');
				}
				break;
			default:
				throw new Error('Invalid recurrence unit');
		}

		const newYear = newDate.getFullYear();
		const newMonth = newDate.getMonth() + 1; // Adding 1 because months are zero-based
		const newDay = newDate.getDate();

		// Ensure the output date is in the 'yyyy-MM-dd' format
		const newDateStr = `${newYear}-${newMonth.toString().padStart(2, '0')}-${newDay
			.toString()
			.padStart(2, '0')}`;

		return newDateStr;
	}

	function uncompleteTask(todo) {
		todo.uncompleteTask();
		$todoItems = $todoItems;
		$status = 'Todo uncompleted';
	}

	import { CheckCircleIcon, CircleIcon } from 'svelte-feather-icons';
</script>

{#if todo.isComplete()}
	<button on:click={uncompleteTask(todo)}><CheckCircleIcon size="18" /></button>
{:else}
	<button on:click={completeTask(todo)}><CircleIcon size="18" /></button>
{/if}

<style>
	button {
		border: none;
		background: none;
		cursor: pointer;
		margin: 0;
		padding: 0;
	}
</style>
