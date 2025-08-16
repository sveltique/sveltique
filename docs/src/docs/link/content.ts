import { script } from '$utils/playground.js';

export const basicUsageCode = {
	short: `<Link href="#basic-usage">
    Go to the "Basic Usage" section
</Link>`,
	expanded: `${script('import { Link } from "@sveltique/components";')}
    
<Link href="#basic-usage">
    Go to the "Basic Usage" section
</Link>`
};

export const underlineCode = {
	short: `<Link href="#">underline="always"</Link>
<Link href="#" underline="hover">underline="hover"</Link>
<Link href="#" underline="none">underline="none"</Link>`,
	expanded: `${script('import { Link } from "@sveltique/components";')}

<Link href="#">underline="always"</Link>
<Link href="#" underline="hover">underline="hover"</Link>
<Link href="#" underline="none">underline="none"</Link>`
};

export const externalCode = {
	short: `<Link
    href="https://developer.mozilla.org"
    external
    title="To read more, see the MDN docs in a new tab."
>
    See the MDN docs
</Link>`,
	expanded: `${script('import { Link } from "@sveltique/components";')}

<Link
    href="https://developer.mozilla.org"
    external
    title="To read more, see the MDN docs in a new tab."
>
    See the MDN docs
</Link>`
};
