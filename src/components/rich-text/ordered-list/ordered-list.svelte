<script lang="ts">
  import type { ISbRichtext } from '@storyblok/js';

  import { cn } from '$lib/utils/tailwind';

  import Scribble from './scribble.svelte';
  import Paragraph from '$components/rich-text/paragraph.svelte';

  export let content: ISbRichtext;
</script>

{#if content.content}
  <ol class="flex flex-col gap-12 py-24">
    {#each content.content as item, i}
      <li class="flex items-start justify-center gap-12">
        <div class="items-certer relative justify-center text-highlight-foreground">
          <Scribble />
          <p
            class={cn(
              'absolute -top-12 font-handwrite text-2xl/normal font-normal',
              i + 1 >= 10 ? '-left-full' : '-left-2'
            )}
          >
            {i + 1}
          </p>
        </div>

        <Paragraph content={item} class="py-0" />
      </li>
    {/each}
  </ol>
{/if}
