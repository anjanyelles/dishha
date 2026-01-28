<script lang="ts">
  import type { HeroFormStoryblok } from '$types/bloks';

  import { cn } from '$lib/utils/tailwind';

  import Title from '$components/title.svelte';
  import CalendlyForm from '$components/calendly-form.svelte';
  import FeatureItem from '$components/benefits/feature-item.svelte';
  import BookADemoIllustration from '$components/heros/hero-form/assets/book-a-demo.webp';
  import GetInTouch from '$components/heros/hero-form/assets/get-in-touch.webp';

  export let blok: HeroFormStoryblok;
  $: ({ title, embed, items } = blok);

  $: isCalendly = embed?.length && embed[0].component === 'calendly';
</script>

<section class="relative isolate flex h-full w-full overflow-hidden">
  <div class="relative mx-auto flex w-full px-20 pb-80 pt-80 lg:px-48 xl:max-w-container">
    <div class={cn('flex w-full flex-col gap-48', isCalendly && 'grid lg:grid-cols-2 lg:gap-x-48')}>
      {#if title?.[0]}
        <Title
          data={title[0]}
          class="w-full lg:max-w-[648px]"
          descriptionClass="max-w-[531px]"
          titleClass="lg:text-4xl"
        />
      {/if}
      {#if items?.length}
        <div class="flex w-full flex-col gap-16 lg:mt-120">
          {#each items as item}
            <FeatureItem data={item} class="flex max-w-[292px] basis-full flex-col p-0 lg:p-0" />
          {/each}
        </div>
      {/if}

      {#if isCalendly}
        {@const { component, calendar } = embed[0]}
        <div
          class={cn(
            'h-fit min-h-[800px] w-full max-w-[514px] rounded-4xl border border-highlight-foreground border-opacity-24 bg-[#EBEBF7] p-20 lg:row-span-2 lg:ml-auto lg:min-w-[514px]',
            component === 'calendly' && 'h-[930px] lg:h-[930px]'
          )}
        >
          {#if calendar}
            <CalendlyForm calendar={String(calendar)} />
          {/if}
        </div>
      {/if}

      {#if embed?.length && embed[0].component === 'hubspot-form'}
        <div
          class="pointer-events-none block w-[600px] lg:absolute lg:-right-[100px] lg:bottom-[60px] lg:w-[900px] lg:translate-x-[90px] xl:w-auto"
        >
          <img role="presentation" src={GetInTouch} alt="" />
        </div>
      {/if}

      {#if isCalendly}
        <div class="lg:mt-0">
          <img
            alt=""
            src={BookADemoIllustration}
            role="presentation"
            class="aspect-auto h-full w-full max-w-[770px] flex-shrink-0 translate-y-20 lg:-translate-x-60"
          />
        </div>
      {/if}
    </div>
  </div>
</section>
