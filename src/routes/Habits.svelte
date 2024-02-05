<script>
	// @ts-nocheck
	import { todoTxt } from '$lib/stores';

	export let todo;

	$: search = compileSearch(todo);
	$: matches = $todoTxt
		.items()
		.filter((item) => item.isComplete())
		.filter((item) => item.render().includes(search));

	function compileSearch(todo) {
		let search = todo.render();
		search = removePri(search);
		search = removeDone(search);
		search = removeCreated(search);
		return search;
	}
	function removePri(str) {
		return str.replace(/\([A-Z]\)\s/g, '');
	}
	function removeDone(str) {
		return str.replace(/x \d\d\d\d-\d\d-\d\d\s/g, '');
	}
	function removeCreated(str) {
		return str.replace(/\d\d\d\d-\d\d-\d\d\s/g, '');
	}
	function isHabit(search, matches) {
		return todo.isComplete() ? matches.length > 1 : matches.length > 0;
	}

    function doneInPast(matches, daysBack) {
        const checkDate = new Date().setDate(new Date().getDate() - daysBack);
        const checkISO = new Date(checkDate).toISOString().substring(0, 10);
        const completedDateRegex = /x (\d\d\d\d-\d\d-\d\d) /;
        const completedDates = matches.map((item) => item.render().match(completedDateRegex)[1]);
        return completedDates.includes(checkISO);
    }
</script>

{#if isHabit(search, matches)}
	<div>
		<span class:done={doneInPast(matches, 4)}>&nbsp;</span>
        <span class:done={doneInPast(matches, 3)}>&nbsp;</span>
        <span class:done={doneInPast(matches, 2)} class:weekend={true}>&nbsp;</span>
        <span class:done={doneInPast(matches, 1)} class:weekend={true}>&nbsp;</span>
        <span class:done={doneInPast(matches, 0)}>&nbsp;</span>
	</div>
{/if}

<style>
	div {
		display: flex;
		align-items: center;
		gap: 0.25rem;
        margin-right: 0.25rem;
	}

	span {
		width: 1rem;
		height: 1rem;
		border: 1px solid var(--secondary-6);
	}
    span.done {
        background-color: var(--secondary-6);
    }
    span.weekend {
        border-color: var(--accent-7);
    }
    span.done.weekend {
        background-color: var(--accent-7);
    }
</style>
