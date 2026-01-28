<script lang="ts">
  import type { VideoStoryblok } from '$types/bloks';

  import Video from '$components/video.svelte';

  export let blok: VideoStoryblok;
  $: ({ video, loop } = blok);
</script>

{#if video}
  <Video {video} {loop} caption={video.title} class="my-48" />
{/if}
