<script module>
export const metadata = {
	description: "Provides a scrollable container for overflowing content."
};
</script>

<script lang="ts">
import { Scrollable } from "@sveltique/components";
import Playground from "$lib/components/Playground.svelte";
import { script } from '$utils/playground';

const basicUsageCode = `${script('import { Scrollable } from "@sveltique/components";')}

<Scrollable class="flex flex-col gap-3 w-full h-44">
    <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda reiciendis at magnam
        facilis totam odit impedit repellendus reprehenderit itaque quam? Natus, incidunt numquam
        quia ipsa saepe error sapiente ipsam aut?
    </p>
    <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor consequuntur, eaque non
        commodi nostrum earum alias blanditiis natus inventore optio, pariatur illum harum saepe
        deleniti impedit aut, dolorem incidunt ipsa?
    </p>
    <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis nulla corporis voluptates
        velit repellat assumenda dolorum minima, unde cumque voluptas voluptate non corrupti aperiam
        odit quis molestiae. Ipsa, reiciendis vero.
    </p>
</Scrollable>`;
</script>

<h1 id="scrollable">Scrollable</h1>
<p>Provides a scrollable container for overflowing content.</p>

<h2 id="basic-usage">Basic Usage</h2>
<p>Set the container's width and height to define the scrollable area.</p>
<Playground code={basicUsageCode}>
    <Scrollable class="flex flex-col gap-3 w-full h-44">
        <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda reiciendis at magnam
            facilis totam odit impedit repellendus reprehenderit itaque quam? Natus, incidunt numquam
            quia ipsa saepe error sapiente ipsam aut?
        </p>
        <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor consequuntur, eaque non
            commodi nostrum earum alias blanditiis natus inventore optio, pariatur illum harum saepe
            deleniti impedit aut, dolorem incidunt ipsa?
        </p>
        <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis nulla corporis voluptates
            velit repellat assumenda dolorum minima, unde cumque voluptas voluptate non corrupti aperiam
            odit quis molestiae. Ipsa, reiciendis vero.
        </p>
    </Scrollable>
</Playground>
