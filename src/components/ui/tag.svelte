<script lang="ts">
  import { cn } from '$lib/utils/tailwind';

  import type { IconOption } from '$components/ui/icon/icon.svelte';
  import Icon, { getValidIcon } from '$components/ui/icon/icon.svelte';

  export let icon: IconOption | undefined = undefined;

  let className: string | undefined = undefined;
  export { className as class };
</script>

<div
  class={cn(
    `
        flex
        w-fit
        select-none

        flex-nowrap
        items-center
        justify-center

        gap-6 
        overflow-hidden

        rounded-full

        border 
        border-foreground

        border-opacity-4
        bg-highlight
        bg-opacity-8

        px-12 
        py-6 
        text-sm/snug 
        font-medium
        tracking-wide
        text-highlight-foreground

        text-opacity-80
    `,
    className
  )}
>
  {#if icon}
    {@const typedIcon = getValidIcon(icon)}
    {#if typedIcon}
      <Icon icon={typedIcon} size={20} class="opacity-64" />
    {/if}
  {/if}

  <slot />
</div>
