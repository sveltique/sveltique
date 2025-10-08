import type { Animation, ProviderContextOptions } from "@sveltique/components/config";
import { untrack } from "svelte";

const LOCAL_OPTIONS_NAME = "sveltique-provider-options";

class SveltiqueProviderContext implements ProviderContextOptions {
	public animation = $state<Animation>("system");

	constructor() {
		$effect.root(() => {
			$effect(() => {
				untrack(() => {
					if (!localStorage.getItem(LOCAL_OPTIONS_NAME)) {
						localStorage.setItem(LOCAL_OPTIONS_NAME, this.toString());
					} else {
						const localOptions: Required<ProviderContextOptions> = JSON.parse(
							localStorage.getItem(LOCAL_OPTIONS_NAME) ?? "{}"
						);

						this.animation = localOptions.animation;
					}
				});
			});

			$effect(() => {
				localStorage.setItem(LOCAL_OPTIONS_NAME, this.toString());
			});
		});
	}

	private toString(): string {
		return JSON.stringify(this.toJSON());
	}

	private toJSON(): Required<ProviderContextOptions> {
		return {
			animation: this.animation
		};
	}
}

export const sveltiqueProvider = new SveltiqueProviderContext();
