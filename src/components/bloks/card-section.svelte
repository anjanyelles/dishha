<script lang="ts">
  import type { CardSectionStoryblok } from '$types/bloks';

  import { tablet } from '$lib/utils/media';
  import { createMediaStore } from '$lib/stores/media';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';

  import Title from '$components/title.svelte';
  import Card from '$components/ui/card/card.svelte';
  import Aqua from '$components/card-section/assets/aqua-circle.webp';
  import Lilac from '$components/card-section/assets/lilac-circle.webp';
  import Orange from '$components/card-section/assets/orange-circle.webp';
  import Yellow from '$components/card-section/assets/yellow-circle.webp';
  import { cn } from '$lib/utils/tailwind';

  export let blok: CardSectionStoryblok;
  $: ({ title, card, illustration_theme } = blok);

  let illustration: string;
  $: {
    if (illustration_theme === 'aqua') {
      illustration = Aqua;
    } else if (illustration_theme === 'orange') {
      illustration = Orange;
    } else if (illustration_theme === 'yellow') {
      illustration = Yellow;
    } else if (illustration_theme === 'lilac') {
      illustration = Lilac;
    } else {
      illustration = Aqua;
    }
  }

  const isMobile = createMediaStore(tablet);
</script>

<section class="relative isolate overflow-hidden bg-highlight-secondary">
  <div
    class="relative flex w-full flex-col items-center justify-between gap-20 px-20 pb-48 lg:mx-auto lg:flex-row lg:pt-40 xl:max-w-container xl:items-start xl:px-0 xl:pb-48"
  >
    {#if title?.[0]}
      <Title
        data={title[0]}
        class="w-full self-start py-48 lg:max-w-[449px] xl:mb-[200px] xl:ml-165 xl:mr-0 xl:px-0"
      />
    {/if}

    {#if card?.length}
      {@const { tag, title, link } = card[0]}
      {@const { href } = getAnchorFromCmsLink(link?.[0].link)}
      <Card
        {href}
        {title}
        size={$isMobile ? 'sm' : 'md'}
        class="lg:mr-100 xl:mr-[197px] xl:mt-24"
        contentCardStyle="w-full h-full lg:min-w-[344px] lg:min-h-[461px] max-w-[344px]"
        tag={tag?.[0].label}
        cta={{ label: link?.[0].title }}
      />
    {/if}

    {#if illustration_theme}
      <img
        alt=""
        role="presentation"
        src={illustration}
        class={cn(
          'pointer-events-none absolute -bottom-[630px] -left-[220px] hidden xl:block xl:w-[1198px]',
          illustration_theme === 'lilac'
            ? '-bottom-[500px] -left-[80px] max-w-[800px]'
            : 'min-w-[800px]'
        )}
      />
    {/if}
  </div>
</section>
