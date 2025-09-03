export function slugify(str: string) {
	return str
		.split(" ")
		.map((word) => word.toLowerCase())
		.join("-");
}
