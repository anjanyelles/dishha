<script lang="ts">
  import type { TitleWithIllustrationStoryblok } from '$types/bloks';

  import Title from '$components/title.svelte';

  export let blok: TitleWithIllustrationStoryblok;

  import IntegrationsIllustration from '$components/title-with-illustration/assets/integrations.webp';

  $: ({ title, illustration } = blok);
</script>

<section class="relative isolate flex h-full w-full flex-col overflow-hidden">
  <div class="relative flex w-full flex-col lg:mx-auto xl:max-w-container">
    {#if title?.[0]}
      <Title data={title[0]} class="z-20 mx-auto px-20 pb-48 pt-48 desktop:px-0 desktop:pt-80" />
    {/if}

    {#if illustration === 'integrations'}
      <img
        alt=""
        role="presentation"
        src={IntegrationsIllustration}
        class="pointer-events-none -z-10 -mt-[260px] w-full min-w-[1000px] self-center desktop:-mt-[380px]"
      />
    {/if}
  </div>
</section>
