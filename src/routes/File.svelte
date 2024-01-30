<script>
	// @ts-nocheck
	import { browser } from '$app/environment';
	import { file, todoTxt, status } from '$lib/stores';
	import { TodoTxt } from '$lib/todotxt';

	if (browser && 'showOpenFilePicker' in window) {
		$status = 'File Picker is supported';
	} else {
		$status = 'File Picker is not supported, use an alternative';
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
		$status = 'File loaded';
		autoRefresh();
	}

	async function autoRefresh() {
		if (!fileHandle) return;
		await new Promise((resolve) => setTimeout(resolve, 1000));
		let refresh = await fileHandle.getFile();
		if (refresh.lastModified > $file.lastModified) {
			readFile();
		} else {
			autoRefresh();
		}
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
		$status = 'File saved';
	}

	if (browser) {
		document.addEventListener('keydown', (e) => {
			if (e.code === 'F5' || ((e.ctrlKey || e.metaKey) && e.code === 'KeyS')) {
				e.preventDefault();
				saveFile();
			}
		});
	}

	if (browser) {
		window.onbeforeunload = function () {
			return 'Are you sure you want to leave?';
		};
	}

	file.subscribe((value) => {
		if (!value) return;
		if (!document) return;
		document.title = `${value.name} - ${value.lastModifiedDate.toISOString().replace('T', ' ').substr(0, 16)}`;
	});

	$status = "Drag and drop a todo.txt file here";
</script>

<button on:click={openFile}><svg><use href="feather-sprite.svg#upload" /></svg> Open</button>
<button on:click={readFile} disabled={!fileHandle}><svg><use href="feather-sprite.svg#refresh-cw" /></svg> Reload</button>
<button on:click={saveFile} disabled={!fileHandle}><svg><use href="feather-sprite.svg#save" /></svg> Save</button>

<style>
	button {
		font-size: inherit;
		display: inline-flex;
		gap: 0.5rem;
		align-items: center;
	}
</style>
