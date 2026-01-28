<script lang="ts">
  import type { SupportStoryblok } from '$types/bloks';

  import { config } from '$lib/content';
  import { cn } from '$lib/utils/tailwind';

  import Title from '$components/title.svelte';
  import DynamicBlok from '$components/bloks/dynamic-blok.svelte';
  import Illustrations from '$components/support/illustrations.svelte';

  export let blok: SupportStoryblok;
  $: ({ title, body, accent_theme } = blok);

  $: hasSecondaryBackground = body?.some(
    (b) => b.component === 'card-section' || b.component === 'team'
  );
</script>

<section class="relative overflow-hidden">
  <div class="relative mx-auto flex flex-col items-center justify-center">
    {#if title && title[0]}
      <Title
        data={title[0]}
        class="w-full max-w-full bg-background px-20 py-48 lg:px-0 lg:pb-96"
        titleClass="lg:max-w-[744px]"
        descriptionClass="max-w-[532px]"
      />
    {/if}

    <Illustrations
      awardOne={$config?.support_award_one}
      awardTwo={$config?.support_award_two}
      awardThree={$config?.support_award_three}
    />

    <span
      data-theme={accent_theme}
      class={cn(
        'z-10 -mt-[293px] h-[293px] w-full',
        hasSecondaryBackground ? 'bg-highlight-secondary' : 'bg-background'
      )}
    />
  </div>

  <div
    data-theme={accent_theme}
    class={hasSecondaryBackground ? 'bg-highlight-secondary' : 'bg-background'}
  >
    {#each body || [] as b}
      <DynamicBlok blok={b} />
    {/each}
  </div>
</section>
