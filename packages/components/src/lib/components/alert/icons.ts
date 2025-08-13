import type { ComponentType } from 'svelte';
import type { AlertVariants } from './variants.js';

import IconCircleCheckFilled from '@tabler/icons-svelte/icons/circle-check-filled';
import IconAlertTriangleFilled from '@tabler/icons-svelte/icons/alert-triangle-filled';
import IconInfoCircleFilled from '@tabler/icons-svelte/icons/info-circle-filled';
import IconExclamationCircleFilled from '@tabler/icons-svelte/icons/exclamation-circle-filled';

export const icons: Record<NonNullable<AlertVariants['type']>, ComponentType> = {
	success: IconCircleCheckFilled,
	warning: IconAlertTriangleFilled,
	info: IconInfoCircleFilled,
	danger: IconExclamationCircleFilled
};
