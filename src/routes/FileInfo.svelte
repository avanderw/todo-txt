<script>
	// @ts-nocheck
	import { file } from '$lib/stores';
</script>

{#if $file}
	<h1>{$file.name}</h1>
	<span>Last modified: {$file.lastModifiedDate.toDateString()}</span>
{/if}
