<script lang="ts">
  import type { ISbRichtext } from '@storyblok/js';

  import OddScribble from './odd-scribble.svelte';
  import EvenScribble from './even-scribble.svelte';

  import Paragraph from '$components/rich-text/paragraph.svelte';

  export let content: ISbRichtext;
</script>

{#if content.content}
  <ul class="flex flex-col gap-12 py-24">
    {#each content.content as item, i}
      <li
        class="flex list-disc items-start justify-center gap-12 text-md/normal font-normal tracking-wide"
      >
        <div class="pt-3">
          {#if i % 2 === 0}
            <EvenScribble />
          {:else}
            <OddScribble />
          {/if}
        </div>

        <Paragraph content={item} class="py-0" />
      </li>
    {/each}
  </ul>
{/if}
