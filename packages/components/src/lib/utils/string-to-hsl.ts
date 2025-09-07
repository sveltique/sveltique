type MinMax = [number, number];

type StringToHSLOptions = {
	/** @default [-45, 45] */
	hue?: MinMax;
	/** @default [75, 100] */
	sat?: MinMax;
	/** @default [40, 60] */
	lit?: MinMax;
};

// From https://gist.github.com/0x263b/2bdd90886c2036a1ad5bcf06d6e6fb37
/**
 * Converts a string to a color.
 * @param str The string to convert.
 * @param options Additional options for the range of allowed generated colors.
 * @returns A color in HSL format.
 */
export function stringToHSL(str: string, options: StringToHSLOptions = {}) {
	const { hue = [-45, 45], sat = [75, 100], lit = [40, 60] } = options;

	const range = (hash: number, min: number, max: number) => {
		const diff = max - min;
		const x = ((hash % diff) + diff) % diff;
		return x + min;
	};

	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
		hash = hash & hash;
	}

	const h = range(hash, hue[0], hue[1]);
	const s = range(hash, sat[0], sat[1]);
	const l = range(hash, lit[0], lit[1]);

	return `hsl(${h},${s}%,${l}%)` as const;
}
