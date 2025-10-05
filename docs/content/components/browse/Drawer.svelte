<script module>
export const metadata = {
	description:
		"A panel that slides from the edge of the screen, and revealing contextual content."
};
</script>

<script lang="ts">
import { Alert, Badge, Kbd, Link } from "@sveltique/components";
import {
	AccessibleLabelAndDescriptionDemo,
	AllowOverlayClickDemo,
	BasicUsageDemo,
	ControlledStateDemo,
	FromDemo,
	HandlingFocusOnExitDemo,
	WithoutActionsSnippetDemo
} from "$demos/accordion";
</script>

<h1 id="drawer">Drawer</h1>
<p>A panel that slides from the edge of the screen, and revealing contextual content.</p>

<h2 id="basic-usage">Basic Usage</h2>
<p>A drawer is composed of three main parts: a trigger to open it, its content, and optional actions.</p>
<BasicUsageDemo />

<h3 id="from">From</h3>
<p>
    Use the <Badge variant="secondary">from</Badge> property to define the side from which the drawer
    appears.
</p>
<FromDemo />

<h3 id="without-actions-snippet">Without <Badge variant="secondary">actions</Badge> snippet</h3>
<p>
	If you don't want actions fixed at the bottom, you can use the <Badge variant="secondary">children</Badge>
    snippet to access the <Badge variant="secondary">close</Badge> function directly.
</p>
<WithoutActionsSnippetDemo />

<h2 id="controlled-state">Controlled state</h2>
<p>
    Manage the drawer's open state programmatically using the <Badge variant="secondary">isOpen</Badge>
    property.
</p>
<ControlledStateDemo />

<h2 id="accessibility">Accessibility</h2>
<p>Additional notes or recommendations to improve the accessibility of your drawers.</p>

<h3 id="handling-focus-on-exit">Handling focus on exit</h3>
<p>
	The trigger snippet also provides a <Badge variant="secondary">ref</Badge> attribute that you can
    bind to the trigger element. It restores focus to the trigger when the drawer is closed.
</p>
<HandlingFocusOnExitDemo />

<h3 id="allow-overlay-click">Allow overlay click</h3>
<p>
	You should only set <Badge variant="secondary">closeOnOverlayClick</Badge> for low-stakes interactions
    where accidentally closing the drawer will not cause loss of important data or irreversible actions.
    See the <Link external href="https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/">
		accessibility guidelines
	</Link> for more information.
</p>
<Alert class="mb-4">When set, the drawer also closes on <Kbd>Esc</Kbd> press.</Alert>
<AllowOverlayClickDemo />

<h3 id="accessible-labels-and-descriptions">Accessible labels and descriptions</h3>
<p>
	For accessibility purposes, a drawer should link a label (indicating the title of the drawer), and
    a description (describing the primary purpose of the drawer).
</p>
<p>
    The <Badge variant="secondary">children</Badge> snippet contains spreadable props (respectively
    <Badge variant="secondary">labelProps</Badge> and <Badge variant="secondary">descriptionProps</Badge>)
    which you can use in your markup.
</p>
<AccessibleLabelAndDescriptionDemo />
