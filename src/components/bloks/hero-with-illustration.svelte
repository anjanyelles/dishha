<script lang="ts">
  import type { HeroWithIllustrationStoryblok } from '$types/bloks';

  import { cn } from '$lib/utils/tailwind';

  import Title from '$components/title.svelte';

  import WhyUsIllustration from '$components/heros/hero-with-illustration/assets/why-us.webp';
  import GrowthIllustration from '$components/heros/hero-with-illustration/assets/growth.webp';
  import PartnersIllustration from '$components/heros/hero-with-illustration/assets/partners.webp';
  import CalculatorIllustration from '$components/heros/hero-with-illustration/assets/calculator.webp';
  import ManagementIllustration from '$components/heros/hero-with-illustration/assets/management.webp';
  import EngagementIllustration from '$components/heros/hero-with-illustration/assets/engagement.webp';
  import ComparisonsIllustration from '$components/heros/hero-with-illustration/assets/comparisons.webp';
  import IntegrationsIllustration from '$components/heros/hero-with-illustration/assets/integrations.webp';
  import WholePlatformIllustration from '$components/heros/hero-with-illustration/assets/whole-platform.webp';
  import IntegrationsOrbitsIllustration from '$components/heros/hero-with-illustration/assets/integrations-orbits.webp';

  export let blok: HeroWithIllustrationStoryblok;

  $: ({ title, illustration } = blok);
</script>

<section class="relative isolate flex h-full w-full flex-col overflow-hidden">
  <div class="relative flex w-full flex-col lg:mx-auto xl:max-w-container">
    {#if title?.[0]}
      <div
        class={cn(
          'mx-auto items-center justify-center desktop:pl-48',
          (illustration === 'Why Us' ||
            illustration === 'Comparisons' ||
            illustration === 'Partners') &&
            'mx-0 lg:mx-0'
        )}
      >
        <Title
          data={title[0]}
          titleClass={cn('lg:text-4xl', illustration === 'Calculator' && 'lg:max-w-[878px]')}
          descriptionClass={cn(
            illustration === 'Why Us' && 'max-w-[531px]',
            illustration === 'Comparisons' && 'max-w-[417px]'
          )}
          class={cn(
            'max-w-[648px] px-20 pb-48 pt-48 md:pl-48 desktop:px-0 desktop:pt-80',
            illustration === 'Calculator' && 'lg:max-w-[878px]'
          )}
        />
      </div>
    {/if}

    {#if illustration === 'Comparisons'}
      <img
        alt=""
        role="presentation"
        src={ComparisonsIllustration}
        class="pointer-events-none -z-10 -mt-[20px] w-full min-w-[500px] max-w-[900px] lg:-mt-[200px] lg:self-end xl:-mt-[400px]"
      />
    {/if}

    {#if illustration === 'Whole Platform'}
      <img
        alt=""
        role="presentation"
        src={WholePlatformIllustration}
        class="pointer-events-none -z-10 -mt-[260px] min-w-[1000px] self-center xl:-mt-[540px] xl:max-w-[1860px] xl:-translate-x-[20px]"
      />
    {/if}

    {#if illustration === 'Management'}
      <img
        alt=""
        role="presentation"
        src={ManagementIllustration}
        class="pointer-events-none -z-10 -mt-[260px] min-w-[1000px] self-center xs:translate-x-[160px] md:translate-x-0 xl:-mt-[540px] xl:max-w-[1860px] xl:translate-x-[120px]"
      />
    {/if}

    {#if illustration === 'Engagement'}
      <img
        alt=""
        role="presentation"
        src={EngagementIllustration}
        class="pointer-events-none -z-10 min-w-[1000px] translate-x-[120px] self-center xs:-mt-[300px] md:-mt-[200px] md:min-w-[1200px] lg:-mt-[540px] lg:max-w-[1777px] lg:translate-x-[200px] xl:translate-x-[24px]"
      />
    {/if}

    {#if illustration === 'Growth'}
      <img
        alt=""
        role="presentation"
        src={GrowthIllustration}
        class="pointer-events-none -z-10 min-w-[1000px] self-center xs:-mt-[300px] md:-mt-[200px] md:translate-x-[24px] lg:-mt-[540px] lg:max-w-[1777px]"
      />
    {/if}

    {#if illustration === 'Integrations'}
      <img
        alt=""
        role="presentation"
        src={IntegrationsIllustration}
        class="pointer-events-none -z-10 min-w-[600px] translate-x-[30px] self-center lg:mt-46 lg:max-w-[800px]"
      />

      <img
        alt=""
        role="presentation"
        src={IntegrationsOrbitsIllustration}
        class="pointer-events-none absolute top-0 -z-10 hidden w-[1439px] self-center lg:block"
      />
    {/if}

    {#if illustration === 'Partners'}
      <img
        alt=""
        role="presentation"
        src={PartnersIllustration}
        class="pointer-events-none -z-10 -mt-[100px] min-w-[1600px] translate-x-[400px] self-end md:translate-x-[156px] lg:-mt-[400px] lg:max-w-[2310px] lg:translate-x-[220px]"
      />
    {/if}

    {#if illustration === 'Why Us'}
      <img
        alt=""
        role="presentation"
        src={WhyUsIllustration}
        class="pointer-events-none -z-10 -mt-[100px] min-w-[600px] self-center lg:-mt-[540px] lg:mb-80 lg:max-w-[900px] lg:translate-x-[160px] lg:self-end"
      />
    {/if}

    {#if illustration === 'Calculator'}
      <img
        alt=""
        role="presentation"
        src={CalculatorIllustration}
        class="pointer-events-none -z-10 -mt-48 min-w-[900px] self-center lg:max-w-[1694px]"
      />
    {/if}
  </div>
</section>
