<script>
	// @ts-nocheck
	import { todoItems } from '$lib/stores';
	import { ToggleLeftIcon, ToggleRightIcon } from 'svelte-feather-icons';

	let auto = true;
	let unsubscribe = todoItems.subscribe(sort);

	function toggle() {
		auto = !auto;
		if (auto) {
			unsubscribe = todoItems.subscribe(sort);
            $todoItems = $todoItems;
		} else {
			unsubscribe();
		}
	}

	function sort(value) {
		if (value) {
			value.sort((a, b) => a.render().localeCompare(b.render()));
		}
	}
</script>

<button on:click={toggle}
	><span>Sort</span>
	{#if auto}
		<ToggleRightIcon />
	{:else}
		<ToggleLeftIcon />
	{/if}
</button>

<style>
    button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
    }
    span {
        margin-right: 0.25rem;
    }
</style>