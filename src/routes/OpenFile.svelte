<script>
    // @ts-nocheck
	import { browser } from '$app/environment';
    import { file, todos } from '$lib/stores';
    import { TodoTxt } from '$lib/todotxt';

	let info;
	if (browser && 'showOpenFilePicker' in window) {
		info = 'showOpenFilePicker is supported';
	} else {
		info = 'showOpenFilePicker is not supported, use an alternative';
	}

    let fileHandle;
	async function openFile() {
		[fileHandle] = await window.showOpenFilePicker({ multiple: false });
		$file = await fileHandle.getFile();
		let text = await $file.text();
        $todos = TodoTxt.parseFile(text);
	}

	if (browser) {
		const body = document.querySelector('body');
		window.addEventListener('dragover', (e) => {
			body.classList.add('dragover');
			e.preventDefault();
			e.stopPropagation();
		});
		window.addEventListener('dragleave', (e) => {
			body.classList.remove('dragover');
		});
		window.addEventListener('drop', async (e) => {
			body.classList.remove('dragover');
			e.preventDefault();
			e.stopPropagation();
			$file = e.dataTransfer.files[0];
            fileHandle = await e.dataTransfer.items[0].getAsFileSystemHandle();
			let text = await $file.text();
            $todos = TodoTxt.parseFile(text);
		});
	}

    async function saveFile() {
        const writable = await fileHandle.createWritable();
        await writable.write(text);
        await writable.close();
    }
</script>

<p>{info}</p>

<button on:click={openFile}>open</button>
<button on:click={saveFile}>save</button>
