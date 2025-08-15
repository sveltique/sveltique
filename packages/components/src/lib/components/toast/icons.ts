import IconCircleCheckFilled from '@tabler/icons-svelte/icons/circle-check-filled';
import InfoIconFilled from '@tabler/icons-svelte/icons/info-circle-filled';
import IconAlertTriangleFilled from '@tabler/icons-svelte/icons/alert-triangle-filled';
import IconExclamationCircleFilled from '@tabler/icons-svelte/icons/exclamation-circle-filled';
import type { ComponentType } from 'svelte';
import type { ToastVariants } from './variants.js';

export const ICONS: Record<ToastVariants['type'], ComponentType> = {
	success: IconCircleCheckFilled,
	info: InfoIconFilled,
	warning: IconAlertTriangleFilled,
	danger: IconExclamationCircleFilled
};
