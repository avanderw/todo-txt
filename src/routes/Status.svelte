<script>
	// @ts-nocheck
	import { status } from '$lib/stores';

	const queue = [];
	let message;
	let isDisplayed = false;
	status.subscribe((value) => {
		queue.push(value);
		if (!isDisplayed) {
			displayMessage();
		}
	});

	function displayMessage() {
		if (queue.length === 0) {
			isDisplayed = false;
			message = "";
			return;
		}
		isDisplayed = true;
		message = queue.shift();
		setTimeout(() => {
			displayMessage();
		}, 3000);
	}
</script>

{#if message}
	<p>{message}</p>
{/if}

<style>
	p {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: var(--primary);
		color: var(--accent);
		padding: 0.5rem;
		margin: 0;
		text-align: center;
	}
</style>