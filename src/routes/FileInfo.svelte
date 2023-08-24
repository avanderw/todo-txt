<script>
	// @ts-nocheck
	import { file } from '$lib/stores';
</script>

{#if $file}
	<span style="font-size:larger">{$file.name}</span><br/>
	<i style="font-size:smaller; font-weight: normal">Last modified: {$file.lastModifiedDate.toDateString()}</i>
{/if}
