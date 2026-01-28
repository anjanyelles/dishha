<script lang="ts">
  import { cn } from '$lib/utils/tailwind';

  import NoResultsCard from './assets/no-results-card.svelte';

  export let title: string;
  export let description: string;

  let className: string | undefined = undefined;
  export { className as class };
</script>

<div class={cn('flex w-full items-center justify-center', className)}>
  <div
    class="flex max-w-[300px] flex-col items-center justify-center text-center text-sm/snug font-medium text-foreground"
  >
    <NoResultsCard />
    <p class="mt-24">{title}</p>
    <p class="mt-4 opacity-60">{description}</p>
  </div>
</div>
