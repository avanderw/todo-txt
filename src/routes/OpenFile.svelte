<script>
	// @ts-nocheck
	import { browser } from '$app/environment';
	import { file, todoTxt, todoItems } from '$lib/stores';
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
		readFile(fileHandle);
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
			readFile(fileHandle);
		});
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
		readFile(fileHandle);
	}

	async function readFile(fileHandle) {
		$file = await fileHandle.getFile();
		let text = await $file.text();
		$todoTxt = TodoTxt.parseFile(text);
		$todoItems = $todoTxt.items().sort((a, b) => a.render().localeCompare(b.render()));
	}
</script>

<p>{info}</p>

<button on:click={openFile}>open</button>
<button on:click={saveFile}>save</button>
