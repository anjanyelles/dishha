<script lang="ts">
  import { page } from '$app/stores';
  import type { LegalStoryblok } from '$types/bloks';

  import LegalHeader from '$components/legal/legal-header.svelte';
  import LegalLayout from '$components/legal/legal-layout.svelte';
  import Seo from '$components/seo.svelte';

  export let blok: LegalStoryblok;
  $: ({ tag } = blok);

  $: story = $page.data.story;
</script>

<Seo />

<LegalLayout {blok}>
  <LegalHeader tag={tag?.[0]} title={story.name} description={story?.content?.description} />
</LegalLayout>
