export function isNumber(value: unknown) {
	return value !== null && value !== "" && !isNaN(Number(String(value)));
}
