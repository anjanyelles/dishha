<script lang="ts">
  import type { TableStoryblok } from '$types/bloks';

  import { cn } from '$lib/utils/tailwind';

  import CheckCircle from './check-circle.svelte';

  export let activeTab = 0;
  export let table: TableStoryblok;
  $: ({ tbody } = table);
</script>

{#if tbody?.length}
  {#each tbody as row}
    {@const firstColumn = row.body[0]}
    <tr
      class="flex w-full border-foreground border-opacity-4 text-foreground last:border-b xl:border-t"
    >
      <!-- Mobile -->
      <div class="flex w-full flex-col xl:hidden">
        {#if row.body[activeTab]}
          {@const { value } = row.body[activeTab + 1]}
          <td
            class="flex w-full items-center justify-between gap-48 border-t border-foreground border-opacity-4 py-24 pl-16 pr-48"
          >
            {#if firstColumn}
              {@const { value } = firstColumn}
              <p class="text-md/normal font-medium tracking-wide">{value}</p>
            {/if}

            {#if value == String('-')}
              <p class="pr-6 text-md font-normal opacity-64">{value}</p>
            {:else}
              <CheckCircle />
            {/if}
          </td>
        {/if}
      </div>

      <!-- Desktop -->
      {#if firstColumn}
        {@const { value } = firstColumn}
        <td class="relative hidden min-w-[348px] max-w-[348px] px-48 py-24 xl:flex">
          <p class="text-md/normal font-medium tracking-wide">{value}</p>

          <span class="vertical-dashed-border absolute right-0 top-0 hidden h-full w-1 xl:block" />
        </td>
      {/if}

      <!-- Desktop -->
      <div class="hidden w-full xl:grid xl:grid-cols-4">
        {#each row.body as { value }, i}
          {#if i !== 0}
            <td
              class={cn(
                'flex max-w-[261px] items-center justify-center px-32 py-24 first:min-w-[261px] first:px-48',
                i === 1 && 'pl-48'
              )}
            >
              {#if value == String('-')}
                <p class="text-md font-normal opacity-64">{value}</p>
              {:else}
                <CheckCircle />
              {/if}
            </td>
          {/if}
        {/each}
      </div>
    </tr>
  {/each}
{/if}
