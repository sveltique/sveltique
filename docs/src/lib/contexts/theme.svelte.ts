import { onMount, untrack } from 'svelte';

type Theme = 'light' | 'dark';

class ThemeContext {
	private _theme = $state<Theme>()!;

	constructor() {
		this._theme = 'light';

		$effect.root(() => {
			$effect(() => {
				untrack(() => {
					this._theme = localStorage.theme ?? this.getSystemPreference();
				});
			});
		});
	}

	get current(): Theme {
		return this._theme;
	}

	get isDark(): boolean {
		return this._theme === 'dark';
	}

	public switch() {
		this._theme = this._theme === 'light' ? 'dark' : 'light';
		localStorage.theme = this._theme;

		if (this._theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	private getSystemPreference(): Theme {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
}

export const theme = new ThemeContext();
