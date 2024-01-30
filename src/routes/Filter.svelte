<script>
	//@ts-nocheck
	import { todoItems, todoTxt, andFilter } from '$lib/stores';
	import HideComplete from './HideComplete.svelte';

	function filterTodos(andFilter, notFilter, orFilter) {
		const andTokens = andFilter ? andFilter.split(/\s+/) : [];
		const notTokens = notFilter ? notFilter.split(/\s+/).filter((token) => token.length !== 0) : [];
		const orTokens = orFilter ? orFilter.split(/\s+/) : [];

		if ($todoTxt) {
			return $todoTxt.items().filter((item) => {
				const text = item.render().toLowerCase();
				const and = andTokens.every((token) => text.includes(token.toLowerCase()));
				const not = notTokens.every((token) => !text.includes(token.toLowerCase()));
				const or = orTokens.some((token) => text.includes(token.toLowerCase()));

				return (and || or) && not;
			});
		} else {
			return [];
		}
	}

	function shortcut(node) {
		function keyEvent(event) {
			if (event.code === 'F3' || ((event.ctrlKey || event.metaKey) && event.code === 'KeyF')) {
				event.preventDefault();
				node.focus();
			}
		}

		window.addEventListener('keydown', keyEvent);

		return {
			destroy() {
				window.removeEventListener('keydown', keyEvent);
			}
		};
	}

	function filterSet(andFilter, notFilter, orFilter) {
		const andSet = andFilter && andFilter.length > 0;
		const notSet = notFilter && notFilter.length > 0;
		const orSet = orFilter && orFilter.length > 0;
		return andSet || notSet || orSet;
	}

	let notFilter, orFilter;
	$: $todoItems = filterTodos($andFilter, notFilter, orFilter);
	$: disableClear = !filterSet($andFilter, notFilter, orFilter);

	todoTxt.subscribe(() => {
		$todoItems = filterTodos($andFilter, notFilter, orFilter);
	});
</script>

<h2>Filters</h2>
<form>
	<label for="filter">AND:</label>
	<input
		id="filter"
		type="text"
		placeholder="Filter..."
		bind:value={$andFilter}
		use:shortcut
		on:keyup={(e) => {
			if (e.key === 'Escape') {
				$andFilter = '';
			}
		}}
	/>

	<label for="exclude">NOT:</label>
	<input
		id="exclude"
		type="text"
		placeholder="Exclude..."
		bind:value={notFilter}
		on:keyup={(e) => {
			if (e.key === 'Escape') {
				notFilter = '';
			}
		}}
	/>
	<label for="include">OR:</label>
	<input
		id="include"
		type="text"
		placeholder="Include..."
		bind:value={orFilter}
		on:keyup={(e) => {
			if (e.key === 'Escape') {
				orFilter = '';
			}
		}}
	/>

	<button
		on:click={() => {
			$andFilter = notFilter = orFilter = '';
			return;
		}}
		type="reset"
		disabled={disableClear}><svg><use href="feather-sprite.svg#x-circle" /></svg>Clear</button
	>
	<HideComplete/>
</form>

<style>
	button {
		font-size: inherit;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0.5rem;
	}
	form {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 5%;
		row-gap: 0.5rem;
	}
	label {
		display: inline-block;
		width: 20%;
		text-align: right;
	}
	input {
		width: 70%;
		border: none;
		padding: 0.2rem;
		font-size: inherit;
	}
	input:disabled {
		background: #eee;
		border-bottom: 1px solid #ddd;
	}
</style>
