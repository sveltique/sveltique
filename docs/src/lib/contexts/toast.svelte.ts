import type { ToastVariants } from "@sveltique/components";

interface ToastData {
	id: string;
	type: ToastVariants["type"];
	content: string;
}

interface AddData {
	/** @default 'info' */
	type?: ToastVariants["type"];
	content: string;
}

class Toasts {
	private _current = $state<ToastData[]>([]);

	get current() {
		return this._current;
	}

	public add(data: AddData) {
		const { type = "info", content } = data;

		const id = crypto.randomUUID();

		this._current.push({ id, type, content });

		setTimeout(() => {
			this._current = this._current.filter((toast) => toast.id !== id);
		}, 3000);
	}
}

export const toasts = new Toasts();
