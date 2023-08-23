

<p>{info}</p>
{#if file}
    <p>{file.name}</p>
{/if}

<button on:click={openFile}>open</button><script>
    // @ts-nocheck

    let info;
    if ('showOpenFilePicker' in window) {
        info = 'showOpenFilePicker is supported';
    } else {
        info = 'showOpenFilePicker is not supported, use an alternative';
    }

    let file;
    async function openFile() {
        const [fileHandle] = await window.showOpenFilePicker({multiple:false});
        const file = await fileHandle.getFile();
        console.log(file);
    }
</script>