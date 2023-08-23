<script>
	// @ts-nocheck
	import { browser } from '$app/environment';
	import { file, todoTxt } from '$lib/stores';
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
		readFile();
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
			readFile();
		});
	}

	async function readFile() {
		$file = await fileHandle.getFile();
		let text = await $file.text();
		$todoTxt = TodoTxt.parseFile(text);
	}

	async function saveFile() {
		const content =
			$todoTxt
				.items()
				.map((item) => item.render())
				.sort((a, b) => a.localeCompare(b))
				.join('\n') + '\n';
		const writable = await fileHandle.createWritable();
		await writable.write(content);
		await writable.close();
		readFile();
        info = "File saved";
	}

    if (browser) {
        document.addEventListener('keydown', (e) => {
            if (e.key === 's' && e.ctrlKey) {
                e.preventDefault();
                saveFile();
            }
        });
    }

</script>

<p>{info}</p>

<button on:click={readFile}>reload</button>
<button on:click={openFile}>open</button>
<button on:click={saveFile}>save</button>
