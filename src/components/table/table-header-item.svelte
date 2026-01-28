<script lang="ts">
  import { storyblokEditable } from '@storyblok/svelte';
  import type { TableHeaderItemStoryblok } from '$types/bloks';

  import IllustratedIcon, {
    getValidIllustratedIcon,
    isValidIllustratedIcon
  } from '$components/ui/illustrated-icon/illustrated-icon.svelte';

  export let data: TableHeaderItemStoryblok;
  $: ({ illustration, name } = data);
</script>

<th
  use:storyblokEditable={data}
  class="flex w-full max-w-[261px] flex-col items-start justify-center gap-20 px-16 py-24 xl:items-center xl:px-32 xl:pb-48 xl:pt-80 xl:first:pl-48"
>
  {#if isValidIllustratedIcon(illustration)}
    {@const typedIllustratedIcon = getValidIllustratedIcon(illustration)}
    {#if typedIllustratedIcon}
      <IllustratedIcon size={56} scribble="halfmoon" icon={typedIllustratedIcon} />
    {/if}
  {/if}

  <p class="text-md/normal font-medium tracking-wide">{name}</p>
</th>
