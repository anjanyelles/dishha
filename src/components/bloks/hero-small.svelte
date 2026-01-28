<script lang="ts">
  import type { HeroSmallStoryblok } from '$types/bloks';

  import { cn } from '$lib/utils/tailwind';

  import Title from '$components/title.svelte';
  import DynamicBlok from '$components/bloks/dynamic-blok.svelte';
  import Background from '$components/customer-stories/background.svelte';
  import PrimaryIllustration from '$components/heros/hero-small/primary-illustration.svelte';
  import SecondaryIllustration from '$components/heros/hero-small/secondary-illustration.svelte';
  import OffersIllustration from '$components/heros/hero-small/offers-illustration.svelte';
  import Lines from '$components/timeline/assets/lines.webp';

  export let blok: HeroSmallStoryblok;
  $: ({ title_illustration, title, content } = blok);
</script>

<section class="relative isolate flex h-full w-full overflow-hidden">
  <!-- Dotted Background -->
  {#if content?.find((b) => b.component === 'customer-stories')}
    <Background />
  {/if}

  {#if content?.find((b) => b.component === 'timeline' || b.component === 'company-items')}
    <img
      alt=""
      src={Lines}
      role="presentation"
      class="pointer-events-none absolute left-1/2 z-40 -ml-32 min-h-[1316px] w-full min-w-[1508px] -translate-x-1/2 lg:pl-32"
    />
  {/if}

  <div class="relative isolate mx-auto w-full flex-col xl:max-w-container">
    <div class="relative w-full">
      {#if title?.[0]}
        <Title
          data={title[0]}
          titleClass="lg:text-4xl/none"
          descriptionClass={cn(
            title_illustration === 'primary' && 'lg:max-w-[532px]',
            title_illustration === 'secondary' && 'lg:max-w-[417px]',
            title_illustration === 'offers' && 'lg:max-w-[648px]'
          )}
          class={cn(
            'mx-auto self-start px-20 pb-40 pt-48 lg:px-0 lg:pt-80',
            title_illustration === 'primary' ? 'lg:max-w-[878px]' : 'lg:max-w-[648px]',
            title_illustration === 'offers' && 'mx-0 lg:px-20 lg:pb-32 xl:pl-48'
          )}
        />
      {/if}
    </div>

    {#if title_illustration === 'primary'}
      <PrimaryIllustration />
    {:else if title_illustration === 'secondary'}
      <SecondaryIllustration />
    {:else if title_illustration === 'offers'}
      <OffersIllustration />
    {/if}

    {#each content || [] as b}
      <DynamicBlok
        blok={b}
        class={cn('w-full', title_illustration === 'offers' && '-mt-[100px] xl:-mt-0')}
      />
    {/each}
  </div>
</section>
