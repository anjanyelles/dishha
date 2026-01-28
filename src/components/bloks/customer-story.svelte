<script lang="ts">
  import { page } from '$app/stores';
  import type { CustomerStoryStoryblok } from '$types/bloks';

  import { string } from '$lib/strings';

  import Seo from '$components/seo.svelte';
  import { getValidIcon, isValidIcon } from '$components/ui/icon/icon.svelte';
  import CustomerStoryHeader from '$components/customer-story/customer-story-header.svelte';
  import CustomerStoryLayout from '$components/customer-story/customer-story-layout.svelte';

  export let blok: CustomerStoryStoryblok;
  $: ({ highlight } = blok);

  $: story = $page.data.story;
</script>

<Seo
  title={story.content.seo_title}
  description={story.content.seo_description}
  image={story.content.seo_og_image}
/>

<CustomerStoryLayout {blok}>
  <CustomerStoryHeader
    tag={{
      icon: isValidIcon(string('default.customer-story.tag.icon'))
        ? getValidIcon(string('default.customer-story.tag.icon'))
        : undefined,
      label: string('default.customer-story.tag')
    }}
    title={story.name}
    description={story?.content?.description}
    highlight={highlight?.[0]}
  />
</CustomerStoryLayout>
