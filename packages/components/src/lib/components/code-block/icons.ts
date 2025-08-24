const icons: Record<string, string> = {
	svelte: `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="icon icon-tabler icons-tabler-outline icon-tabler-brand-svelte"
>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M15 8l-5 3l.821 -.495c1.86 -1.15 4.412 -.49 5.574 1.352a3.91 3.91 0 0 1 -1.264 5.42l-5.053 3.126c-1.86 1.151 -4.312 .591 -5.474 -1.251a3.91 3.91 0 0 1 1.263 -5.42l.26 -.16" />
    <path d="M8 17l5 -3l-.822 .496c-1.86 1.151 -4.411 .491 -5.574 -1.351a3.91 3.91 0 0 1 1.264 -5.42l5.054 -3.127c1.86 -1.15 4.311 -.59 5.474 1.252a3.91 3.91 0 0 1 -1.264 5.42l-.26 .16" />
</svg>`,
	css: `<svg viewBox="0 0 128 128">
    <path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z" />
    <path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z" />
    <path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z" />
    <path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z" />
    <path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z" />
    <path fill="#EBEBEB" d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.331-3.711h34.646zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.33-3.711h16.447z" />
</svg>`,
	json: `<svg viewBox="0 0 128 128" width="24" height="24">
    <linearGradient id="a" x1="-670.564" x2="-583.105" y1="-280.831" y2="-368.306" gradientTransform="matrix(.9988 0 0 -.9987 689.011 -259.008)" gradientUnits="userSpaceOnUse">
        <stop offset="0" />
        <stop offset="1" stop-color="#fff" />
    </linearGradient>
    <path fill="url(#a)" fill-rule="evenodd" d="M63.895 94.303c27.433 37.398 54.281-10.438 54.241-39.205-.046-34.012-34.518-53.021-54.263-53.021C32.182 2.077 2 28.269 2 64.105 2 103.937 36.596 126 63.873 126c-6.172-.889-26.742-5.296-27.019-52.674-.186-32.044 10.453-44.846 26.974-39.214.37.137 18.223 7.18 18.223 30.187 0 22.908-18.156 30.004-18.156 30.004z" clip-rule="evenodd" />
    <linearGradient id="b" x1="-579.148" x2="-666.607" y1="-364.34" y2="-276.873" gradientTransform="matrix(.9988 0 0 -.9987 689.011 -259.008)" gradientUnits="userSpaceOnUse">
        <stop offset="0" />
        <stop offset="1" stop-color="#fff" />
    </linearGradient>
    <path fill="url(#b)" fill-rule="evenodd" d="M63.863 34.086C45.736 27.838 23.53 42.778 23.53 72.703 23.53 121.565 59.739 126 64.128 126 95.818 126 126 99.808 126 63.972 126 24.14 91.404 2.077 64.127 2.077c7.555-1.046 40.719 8.176 40.719 53.504 0 29.559-24.764 45.651-40.87 38.776-.37-.137-18.223-7.18-18.223-30.187 0-22.91 18.11-30.085 18.11-30.084z" clip-rule="evenodd" />
</svg>`,
	text: `<svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    stroke-width="2" 
    stroke-linecap="round" 
    stroke-linejoin="round" 
    class="icon icon-tabler icons-tabler-outline icon-tabler-txt"
>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 8h4" />
    <path d="M5 8v8" />
    <path d="M17 8h4" />
    <path d="M19 8v8" />
    <path d="M10 8l4 8" />
    <path d="M10 16l4 -8" />
</svg>`
};

export function getIcon(filename: string) {
	const extension = filename.split(".").at(-1)!;

	return icons[extension] ?? icons["text"];
}
