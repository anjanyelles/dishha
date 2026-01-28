<script lang="ts">
  import type { ImageStoryblok } from '$types/bloks';

  import Image from '$components/image.svelte';

  export let blok: ImageStoryblok;
  $: ({ image } = blok);
</script>

{#if image}
  <Image as="img" asset={blok.image} class="rounded-3xl" showCaption />
{/if}
