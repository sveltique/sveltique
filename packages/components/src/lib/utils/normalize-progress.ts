/** Normalizes the given value between `0` and `100` based on non-standard `min` and `max`. */
export function normalizeProgress(value: number, min: number, max: number) {
	const scale = 100 / (max - min);
	const percent = (value - min) * scale;

	return Math.min(100, Math.max(0, percent));
};
