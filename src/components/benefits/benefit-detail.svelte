<script lang="ts">
  import { storyblokEditable } from '@storyblok/svelte';
  import type { BenefitDetailsStoryblok } from '$types/bloks';

  import IllustratedIcon, {
    getValidIllustratedIcon,
    isValidIllustratedIcon
  } from '$components/ui/illustrated-icon/illustrated-icon.svelte';
  import { tablet } from '$lib/utils/media';
  import { createMediaStore } from '$lib/stores/media';

  const isMobile = createMediaStore(tablet);

  export let data: BenefitDetailsStoryblok;
  $: ({ icon, title, description, details } = data);
</script>

<div
  use:storyblokEditable={data}
  class="relative flex flex-1 basis-[648px] flex-col tracking-wide lg:px-48"
>
  {#if isValidIllustratedIcon(icon)}
    {@const typedIllustratedIcon = getValidIllustratedIcon(icon)}
    {#if typedIllustratedIcon}
      <IllustratedIcon size={$isMobile ? 60 : 80} scribble="halfmoon" icon={typedIllustratedIcon} />
    {/if}
  {/if}

  <p class="mt-24 max-w-[416px] font-serif text-xl tracking-none lg:text-2xl/snug">{title}</p>
  <p class="mt-8 max-w-[416px] text-md opacity-70 lg:mt-12">{description}</p>

  {#if details?.length}
    <div class="mt-24 flex flex-wrap gap-24 lg:mt-32">
      {#each details as { title, description }}
        <div class="flex max-w-[288px] flex-1 basis-[288px] flex-col gap-6 text-md">
          <p class="font-medium">{title}</p>
          <p class="opacity-70">{description}</p>
        </div>
      {/each}
    </div>
  {/if}
</div>
