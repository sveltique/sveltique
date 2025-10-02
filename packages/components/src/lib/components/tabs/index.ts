import { default as Item, type TabsItemProps } from "./components/Item.svelte";
import { default as List, type TabsListProps } from "./components/List.svelte";
import { default as Panel, type TabsPanelProps } from "./components/Panel.svelte";
import { default as Panels, type TabsPanelsProps } from "./components/Panels.svelte";
import { default as Root, type TabsProps } from "./components/Root.svelte";

export type { TabsItemProps, TabsListProps, TabsPanelsProps, TabsPanelProps, TabsProps };

/**
 * A set of layered sections of content, known as tab panels, that display one panel of content at a time.
 * @see https://sveltique.dev/docs/components/browse/tabs
 */
export const Tabs = {
	/**
	 * The root container for the tabs.
	 * @see https://sveltique.dev/docs/components/browse/tabs
	 */
	Root,
	/**
	 * A list containing the tabs.
	 * @see https://sveltique.dev/docs/components/browse/tabs
	 */
	List,
	/**
	 * An individual tab in the tablist.
	 * @see https://sveltique.dev/docs/components/browse/tabs
	 */
	Item,
	/**
	 * The panel container.
	 * @see https://sveltique.dev/docs/components/browse/tabs
	 */
	Panels,
	/**
	 * An individual panel.
	 * @see https://sveltique.dev/docs/components/browse/tabs
	 */
	Panel
};
