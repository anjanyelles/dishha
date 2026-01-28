<script lang="ts" context="module">
  export const resourceTypes = ['article', 'template', 'ebook'] as const;

  export type ResourceType = (typeof resourceTypes)[number];

  export function getResourceIcon(resourceType: string | undefined) {
    switch (resourceType) {
      case 'article':
        return 'article';
      case 'template':
        return 'template';
      case 'ebook':
        return 'email';
      default:
        return 'article';
    }
  }
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import type { ResourceStoryblok } from '$types/bloks';

  import Seo from '$components/seo.svelte';
  import ResourceHeader from '$components/resource/resource-header.svelte';
  import ResourceLayout from '$components/resource/resource-layout.svelte';

  export let blok: ResourceStoryblok;
  $: ({ type, topic, highlight } = blok);

  $: story = $page.data.story;
</script>

<Seo
  title={story.content.seo_title}
  description={story.content.seo_description}
  image={story.content.seo_og_image}
/>

<ResourceLayout {blok}>
  <ResourceHeader
    tag={{
      icon: getResourceIcon(type),
      label: typeof topic === 'string' ? topic : undefined
    }}
    title={story.name}
    description={story?.content?.description}
    highlight={highlight?.[0]}
  />
</ResourceLayout>
