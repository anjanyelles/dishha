<script lang="ts" context="module">
  export const schema = cloneDeep(RichTextSchema);

  // Fix links href to sanitize url
  schema.marks.link = (node) => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { story, uuid, linktype = 'url', ...attrs } = node.attrs;

    attrs.class = 'link';

    if (linktype === 'email') {
      attrs.href = `mailto:${attrs.href}`;
    }

    if (attrs.href && linktype === 'story') {
      attrs.href = attrs.href.replace(STORYBLOK_PAGES_PREFIX, '');
    }

    if (attrs.anchor) {
      attrs.href = `${attrs.href}#${attrs.anchor}`;
      delete attrs.anchor;
    }

    if (attrs.custom) {
      for (const key in attrs.custom) {
        attrs[key] = attrs.custom[key];
      }
      delete attrs.custom;
    }

    return {
      tag: [{ tag: 'a', attrs: attrs }]
    };
  };

  export const resolver = new RichTextResolver(schema);
</script>

<script lang="ts">
  import cloneDeep from 'clone-deep';
  import type { HTMLAttributes } from 'svelte/elements';
  import { RichTextResolver, type ISbRichtext, RichTextSchema } from '@storyblok/js';

  import { STORYBLOK_PAGES_PREFIX } from '$lib/constants';

  import Heading from '$components/rich-text/heading.svelte';
  import Paragraph from '$components/rich-text/paragraph.svelte';
  import Divider from '$components/rich-text/divider/divider.svelte';
  import OrderedList from '$components/rich-text/ordered-list/ordered-list.svelte';
  import UnorderedList from '$components/rich-text/unordered-list/unordered-list.svelte';
  import RichTextDynamicBlock from '$components/bloks/rich-text/rich-text-dynamic-block.svelte';

  type $$Props = HTMLAttributes<HTMLDivElement> & {
    doc: ISbRichtext;
  };

  export let doc: $$Props['doc'];

  const map = {
    heading: Heading,
    paragraph: Paragraph,
    horizontal_rule: Divider,
    bullet_list: UnorderedList,
    ordered_list: OrderedList
  };

  const isBlok = doc.type === 'blok';
  const component = doc.type && doc.type in map ? map[doc.type as keyof typeof map] : null;
</script>

{#if component}
  <svelte:component this={component} content={doc} {...$$restProps} />
{/if}

{#if isBlok}
  {#each doc.attrs.body as b}
    <RichTextDynamicBlock blok={b} />
  {/each}
{/if}
