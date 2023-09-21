<script>
	//@ts-nocheck
	import { todoItems, todoTxt, filter } from '$lib/stores';
	import { XCircleIcon } from 'svelte-feather-icons';

	function filterTodos(value) {
		if ($todoTxt) {
			if (value) {
				$todoItems = $todoTxt.items().filter((item) => item.render().includes($filter));
			} else {
				$todoItems = $todoTxt.items();
			}
		}
	}

	filter.subscribe((value) => {
		filterTodos(value);
	});

	todoTxt.subscribe((value) => {
		filterTodos($filter);
	});

	function cancelFilter(e) {
		if (e.key === 'Escape') {
			$filter = null;
		}
	}

	function focus(node) {
		console.log("loaded");
		function keyEvent(event) {
			console.log(event.code);
			if (event.code === 'F3' || ((event.ctrlKey || event.metaKey) && event.code === 'KeyF')) {
				event.preventDefault();
				node.focus();
			}
		};

		window.addEventListener('keydown', keyEvent);

		return {
			destroy() {
				window.removeEventListener('keydown', keyEvent);
			}
		};
	}
</script>

<form>
	<input use:focus type="text" on:keyup={cancelFilter} bind:value={$filter} disabled={!$todoTxt} placeholder="Search..."/>
	<button on:click={() => ($filter = null)} disabled={!$filter}><XCircleIcon size="24"/></button>
</form>

<style>
    button {
        border: none;
        background: none;
        cursor: pointer;
        padding: 0;
    }
	form {
		position: relative;
        display: flex;
        align-items: center;
        justify-content: right;
    }
    input {
        border: none;
        border-bottom: 1px solid #000;
        padding: 0.2rem;
        margin: 0.5rem 0;
		width: 5.5rem;
    }
    input:disabled {
        background: #eee;
        border-bottom: 1px solid #ddd;
    }
</style>