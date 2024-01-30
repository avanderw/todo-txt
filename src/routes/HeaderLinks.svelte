<div>
	<a href="https://avanderw.co.za"><svg><use href="feather-sprite.svg#home" /></svg>My homepage</a>
	<a href="https://github.com/avanderw/todo-txt"><svg><use href="feather-sprite.svg#github" /></svg>Repo</a>
</div>

<style>
	@media (orientation: landscape) {
		div {
			align-items: center;
			justify-content: right;
			gap: 1.5rem;
		}
	}
	@media (orientation: portrait) {
		div {
			flex-direction: column;
			align-items: end;
			justify-content: space-between;
			gap: 0.5rem;
		}
	}
	div {
		display: flex;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		font-size: normal;
	}
	a {
		display: flex;
		gap: 0.2rem;
	}
</style>
