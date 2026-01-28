<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { cn } from '$lib/utils/tailwind';

  import TabItem from './tab-item.svelte';
  import { cubicInOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  let className: undefined | string = undefined;
  export { className as class };
  export let options: {
    id: number;
    label: string;
  }[];
  export let activeTab = 0;

  const [send, receive] = crossfade({
    duration: 250,
    easing: cubicInOut
  });
</script>

<div
  role="tablist"
  class={cn(
    'relative flex w-fit flex-row gap-24 overflow-auto break-all px-20 after:absolute after:bottom-0 after:left-0 after:w-full after:border-b after:border-dashed after:border-highlight-foreground after:border-opacity-14 md:mx-auto xl:px-0',
    className
  )}
>
  {#each options as tab, i}
    <div class="relative w-fit max-w-[300px]">
      <TabItem
        id={tab.id}
        label={tab.label}
        isActive={activeTab === tab.id}
        on:click={() =>
          dispatch('optionSelect', {
            i: tab.id
          })}
      />

      {#if activeTab === i}
        <div
          in:send={{ key: 'trigger' }}
          out:receive={{ key: 'trigger' }}
          class="absolute bottom-0 left-0 h-1 w-full rounded-full bg-highlight-foreground"
        />
      {/if}
    </div>
  {/each}
</div>
