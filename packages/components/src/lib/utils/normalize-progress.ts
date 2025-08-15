export const normalizeProgress = (value: number, min: number, max: number) => {
	const scale = 100 / (max - min);
	const percent = (value - min) * scale;

	return Math.min(100, Math.max(0, percent));
};
