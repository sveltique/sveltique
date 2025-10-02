<script lang="ts">
import { Tabs } from "@sveltique/components";
import Playground from "$components/Playground.svelte";
</script>

<h1 id="tabs">Tabs</h1>
<p>
    A set of layered sections of content, known as tab panels, that display one panel of content at
    a time.
</p>

<h2 id="basic-usage">Basic Usage</h2>
<Playground>
    <Tabs.Root value="0">
        <Tabs.List>
            <Tabs.Item value="0">Tab 1</Tabs.Item>
            <Tabs.Item value="1">Tab 2</Tabs.Item>
            <Tabs.Item value="2">Tab 3</Tabs.Item>
        </Tabs.List>
        <Tabs.Panels>
            <Tabs.Panel value="0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, dolorum tempora!
                Ipsam tenetur ad praesentium fugit corrupti eos animi minima?
            </Tabs.Panel>
            <Tabs.Panel value="1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis repudiandae nesciunt
                dicta nulla alias corrupti tenetur reprehenderit totam. Laboriosam, accusantium.
            </Tabs.Panel>
            <Tabs.Panel value="2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quaerat inventore temporibus
                enim consequatur eos nostrum quisquam repellendus accusamus nihil?
            </Tabs.Panel>
        </Tabs.Panels>
    </Tabs.Root>
</Playground>

<h3>Disabled tabs</h3>
<Playground>
    <Tabs.Root value="0">
        <Tabs.List>
            <Tabs.Item value="0">Tab 1</Tabs.Item>
            <Tabs.Item value="1">Tab 2</Tabs.Item>
            <Tabs.Item value="2">Tab 3</Tabs.Item>
            <Tabs.Item disabled>Tab 4</Tabs.Item>
        </Tabs.List>
        <Tabs.Panels>
            <Tabs.Panel value="0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, dolorum tempora!
                Ipsam tenetur ad praesentium fugit corrupti eos animi minima?
            </Tabs.Panel>
            <Tabs.Panel value="1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis repudiandae nesciunt
                dicta nulla alias corrupti tenetur reprehenderit totam. Laboriosam, accusantium.
            </Tabs.Panel>
            <Tabs.Panel value="2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quaerat inventore temporibus
                enim consequatur eos nostrum quisquam repellendus accusamus nihil?
            </Tabs.Panel>
        </Tabs.Panels>
    </Tabs.Root>
</Playground>

<h2 id="vertical-tabs">Vertical tabs</h2>
<Playground>
    <Tabs.Root orientation="vertical" value="0">
        <Tabs.List>
            <Tabs.Item value="0">Tab 1</Tabs.Item>
            <Tabs.Item value="1">Tab 2</Tabs.Item>
            <Tabs.Item value="2">Tab 3</Tabs.Item>
        </Tabs.List>
        <Tabs.Panels>
            <Tabs.Panel value="0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, dolorum tempora!
                Ipsam tenetur ad praesentium fugit corrupti eos animi minima?
            </Tabs.Panel>
            <Tabs.Panel value="1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis repudiandae nesciunt
                dicta nulla alias corrupti tenetur reprehenderit totam. Laboriosam, accusantium.
            </Tabs.Panel>
            <Tabs.Panel value="2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quaerat inventore temporibus
                enim consequatur eos nostrum quisquam repellendus accusamus nihil?
            </Tabs.Panel>
        </Tabs.Panels>
    </Tabs.Root>
</Playground>
