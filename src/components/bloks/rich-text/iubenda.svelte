<script lang="ts">
  import type { IubendaStoryblok } from '$types/bloks';
  import { onMount } from 'svelte';

  export let blok: IubendaStoryblok;
  $: ({ content } = blok);

  onMount(() => {
    if (window && document) {
      var s: HTMLScriptElement = document.createElement('script'),
        tag: HTMLElement = document?.getElementsByTagName('script')[0];
      s.src = 'https://cdn.iubenda.com/iubenda.js';

      if (tag.parentNode) {
        tag.parentNode.insertBefore(s, tag);
      }
    }
  });
</script>

{#if content && typeof content === 'string'}
  <a
    href={content}
    class="iubenda-nostyle no-brand iubenda-noiframe iubenda-embed iubenda-noiframe iub-body-embed"
  >
  </a>
{/if}
