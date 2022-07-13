export function toCamelCase(string) {
	let arr = string.split('-');
	return arr[0] + `${arr[1][0].toUpperCase()}${arr[1].slice(1)}`
}