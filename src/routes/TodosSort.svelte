<script>
	// @ts-nocheck
	import { todoTxt, todoItems } from '$lib/stores';

	function sortLecographically() {
		$todoItems = $todoTxt.items().sort((a, b) => a.render().localeCompare(b.render()));
	}
	
</script>

<button on:click={sortLecographically}>sort</button>
