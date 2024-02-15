<script>
	// @ts-nocheck
	import { todoTxt, andFilter } from '$lib/stores.js';
	import { removeCreatedDate, removeDue } from '$lib/todotxt-util.js';

	$: dueItems = [];
	todoTxt.subscribe((value) => {
		if (value) {
			dueItems = value
				.items()
				.filter((item) => !item.isComplete())
				.filter((item) => item.render().indexOf('due') > 0);
		} else {
			dueItems = [];
		}
	});

	const agenda = {
		pastdue: [],
		today: [],
		tomorrow: [],
		upcoming: []
	};

	$: agenda.pastdue = dueItems.filter((item) => {
		const dueDate = item.render().match(/due:(\d\d\d\d)-(\d\d)-(\d\d)/);
		if (dueDate) {
			return (
				new Date(dueDate[1], dueDate[2] - 1, dueDate[3]) < new Date(new Date().setHours(0, 0, 0, 0))
			);
		}
	});

	$: agenda.today = dueItems.filter((item) => {
		const dueDate = item.render().match(/due:(\d\d\d\d)-(\d\d)-(\d\d)/);
		if (dueDate) {
			return (
				new Date(dueDate[1], dueDate[2] - 1, dueDate[3]).getTime() ===
				new Date().setHours(0, 0, 0, 0)
			);
		}
	});

	$: agenda.tomorrow = dueItems.filter((item) => {
		const dueDate = item.render().match(/due:(\d\d\d\d)-(\d\d)-(\d\d)/);
		if (dueDate) {
			return (
				new Date(dueDate[1], dueDate[2] - 1, dueDate[3]).getTime() ===
				new Date(new Date().setHours(0, 0, 0, 0)).setDate(new Date().getDate() + 1)
			);
		}
	});

	$: agenda.upcoming = dueItems.filter((item) => {
		const dueDate = item.render().match(/due:(\d\d\d\d)-(\d\d)-(\d\d)/);
		if (dueDate) {
			const due = new Date(dueDate[1], dueDate[2] - 1, dueDate[3]).getTime();
			const week = new Date(new Date().setHours(0, 0, 0, 0)).setDate(new Date().getDate() + 7);
			const tomorrow = new Date(new Date().setHours(0, 0, 0, 0)).setDate(new Date().getDate() + 1);
			return due > tomorrow && due < week;
		}
	});

	function filter(item) {
		$andFilter = item.render();
	}
</script>

{#if agenda.pastdue.length > 0}
	<h3 style="color: var(--accent-5)">Past due</h3>
	<ul>
		{#each agenda.pastdue as item}
			<li>
				<button on:click={filter(item)} style="color: var(--accent-5)"
					>{removeDue(removeCreatedDate(item.render()))}</button
				>
			</li>
		{/each}
	</ul>
{/if}
{#if agenda.today.length > 0}
	<h3 style="color: var(--secondary-5)">Due today</h3>
	<ul>
		{#each agenda.today as item}
			<li>
				<button on:click={filter(item)} style="color: var(--secondary-5)"
					>{removeDue(removeCreatedDate(item.render()))}</button
				>
			</li>
		{/each}
	</ul>
{/if}
{#if agenda.tomorrow.length > 0}
	<h3>Due tomorrow</h3>
	<ul>
		{#each agenda.tomorrow as item}
			<li>
				<button on:click={filter(item)}>{removeDue(removeCreatedDate(item.render()))}</button>
			</li>
		{/each}
	</ul>
{/if}
{#if agenda.upcoming.length > 0}
	<h3>Upcoming</h3>
	<ul>
		{#each agenda.upcoming as item}
			<li>
				<button on:click={filter(item)}>{removeDue(removeCreatedDate(item.render()))}</button>
			</li>
		{/each}
	</ul>
{/if}

<style>
	button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		color: inherit;
	}
	li {
		list-style: none;
	}
	ul {
		padding: 0;
	}
</style>
