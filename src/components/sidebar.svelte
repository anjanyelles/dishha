<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { cn } from '$lib/utils/tailwind';
  import { cubicInOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  export let headings: HTMLHeadingElement[] = [];
  export let activeTab = 0;

  const [send, receive] = crossfade({
    duration: 250,
    easing: cubicInOut
  });
</script>

<aside class="sticky left-0 top-[110px] hidden h-fit w-full max-w-[250px] pb-100 xl:block xl:pl-48">
  <div class="relative flex h-full w-fit flex-col justify-between">
    <span
      class="absolute bottom-0 left-0 top-0 w-1 border-l border-dashed border-highlight-foreground border-opacity-14"
    />

    <div class="ml-24 inline-flex flex-col items-start gap-12 transition-all">
      {#if headings.length > 0}
        {#each headings as heading, i}
          <button
            class={cn(
              activeTab === i && 'text-highlight-foreground',
              'relative text-left text-md font-normal leading-normal text-foreground transition-colors hover:text-highlight-foreground'
            )}
            on:click={() => {
              dispatch('scrollIntoView', {
                i: heading
              });
            }}
          >
            {heading.innerText}
            {#if activeTab === i}
              <div
                in:send={{ key: 'trigger' }}
                out:receive={{ key: 'trigger' }}
                class="absolute -left-[23px] top-0 h-full w-1 -translate-x-1/2 rounded-full bg-highlight-foreground"
              />
            {/if}
          </button>
        {/each}
      {/if}
    </div>
  </div>
</aside>
