<script>
	// @ts-nocheck
	import { todoItems } from '$lib/stores';

	function sort(list) {
		if (list) {
			list.sort((a, b) => a.render().localeCompare(b.render()));
		}
	}

	function sortOnce() {
		sort($todoItems);
		$todoItems = $todoItems;
	}
</script>

<button on:click={sortOnce}><svg><use href="feather-sprite.svg#bar-chart" /></svg> Sort</button>

<style>
	button {
		font-size: inherit;
		display: inline-flex;
		gap: 0.5rem;
		align-items: center;
	}
</style>
