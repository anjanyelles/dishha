<script lang="ts">
  import { startStoryblokBridge } from '$lib/storyblok';
  import DynamicBlok from '$components/bloks/dynamic-blok.svelte';

  export let data;
  startStoryblokBridge(data.story.id, (newStory) => {
    data.story = newStory;
  });
</script>

{#key data.story.uuid}
  <DynamicBlok blok={data.story.content} />
{/key}
