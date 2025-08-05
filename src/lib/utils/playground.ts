/** Surrounds code with `script` tags using HTML entities. */
export function script(code: string) {
	return `&lt;script lang="ts"&gt;
    ${code}
&lt;/script&gt;`;
}
