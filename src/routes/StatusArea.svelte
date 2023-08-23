<script>
	import { status } from '$lib/stores';

	$: message = $status;
</script>

{#if message}
	<p>{message}</p>
{/if}
