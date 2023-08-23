<script>
    // @ts-nocheck
    import { file } from '$lib/stores';

</script>

{#if $file}
    <ul>
        <li>{$file.lastModifiedDate}</li>
        <li>{$file.name}</li>
        <li>{$file.size}</li>
        <li>{$file.type}</li>
    </ul>
{/if}

