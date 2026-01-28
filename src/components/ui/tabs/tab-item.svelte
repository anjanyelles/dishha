<script lang="ts">
  import { cn } from '$lib/utils/tailwind';

  export let id: number;
  export let label: string;
  export let isActive: boolean;
</script>

<button
  on:click
  id="{id}-tabhead"
  type="button"
  role="tab"
  class={cn(
    'relative h-full w-full cursor-pointer overflow-hidden break-keep py-16 text-start text-md/normal font-normal text-foreground transition-colors hover:text-highlight-foreground',
    isActive && 'text-highlight-foreground'
  )}
>
  <p class="max-w-[300px] overflow-hidden truncate">
    {label}
  </p>
</button>
