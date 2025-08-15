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
