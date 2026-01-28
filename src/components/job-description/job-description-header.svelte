<script lang="ts">
  import type { TagStoryblok } from '$types/bloks';

  import Tag from '$components/ui/tag.svelte';
  import { getValidIcon } from '$components/ui/icon/icon.svelte';

  export let tag: TagStoryblok | undefined = undefined;
  export let title: string;
  export let description: string | undefined = undefined;
</script>

<div
  class="relative flex flex-col items-center justify-center gap-64 px-20 py-80 text-foreground md:max-w-container xl:mx-auto xl:px-0"
>
  <div class="relative flex w-full max-w-richtext flex-col items-start gap-24">
    {#if tag}
      {@const { icon, label } = tag}
      {@const typedIcon = getValidIcon(icon)}
      <Tag icon={typedIcon}>{label}</Tag>
    {/if}

    {#if title}
      <h1 class="font-serif text-richtext-heading/none font-normal tracking-none">{title}</h1>
    {/if}

    {#if description}
      <p class="text-lg/snug font-normal tracking-wide">{description}</p>
    {/if}
  </div>
</div>
