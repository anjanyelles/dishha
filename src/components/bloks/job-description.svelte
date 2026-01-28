<script lang="ts">
  import { page } from '$app/stores';
  import type { JobDescriptionStoryblok } from '$types/bloks';

  import JobDescriptionLayout from '$components/job-description/job-description-layout.svelte';
  import JobDescriptionHeader from '$components/job-description/job-description-header.svelte';

  export let blok: JobDescriptionStoryblok;
  $: ({ tag } = blok);

  $: story = $page.data.story;
</script>

<JobDescriptionLayout {blok}>
  <JobDescriptionHeader
    tag={tag?.[0]}
    title={story.name}
    description={story?.content?.description}
  />
</JobDescriptionLayout>
