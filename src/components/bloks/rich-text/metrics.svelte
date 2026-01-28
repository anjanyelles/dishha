<script lang="ts">
  import type { MetricsStoryblok } from '$types/bloks';

  export let blok: MetricsStoryblok;
  $: ({ customer_story_metric: metrics } = blok);
</script>

<div class="flex flex-wrap gap-16 py-32">
  {#each metrics as { title, description }}
    <div
      class="flex flex-1 basis-[316px] flex-col gap-16 rounded-2xl border border-highlight-foreground border-opacity-8 bg-highlight bg-opacity-8 p-16 font-normal text-foreground"
    >
      <p class="font-serif text-2xl/snug">{title}</p>
      <p class="text-md/normal tracking-wide">{description}</p>
    </div>
  {/each}
</div>
