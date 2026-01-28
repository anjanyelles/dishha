<script lang="ts">
  import type { BenefitStoryblok } from '$types/bloks';
  import { storyblokEditable } from '@storyblok/svelte';

  export let data: BenefitStoryblok;
  $: ({ metric, title, description } = data);
</script>

<div
  use:storyblokEditable={data}
  class="flex flex-1 basis-[480px] flex-col gap-20 px-0 py-32 text-foreground md:max-w-[500px] xl:px-48"
>
  <p class="font-serif text-3xl/none font-normal">{metric}</p>
  <div class="flex flex-col gap-8 text-md/relaxed font-normal tracking-wide">
    <p class="opacity-64">{title}</p>
    <p class="font-medium">{description}</p>
  </div>
</div>
