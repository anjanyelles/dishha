<script lang="ts">
  import type { FullWidthIllustrationStoryblok } from '$types/bloks';
  import ManagementIllustration from '$components/heros/hero-with-illustration/assets/management.webp';

  export let blok: FullWidthIllustrationStoryblok;
  $: ({ illustration } = blok);
</script>

<div class="relative isolate flex h-full w-full flex-col overflow-hidden">
  <div class="relative flex w-full flex-col lg:mx-auto xl:max-w-container">
    {#if illustration === 'carrers'}
      <img
        alt=""
        role="presentation"
        src={ManagementIllustration}
        class="pointer-events-none -z-10 -mt-[260px] min-w-[1000px] self-center xs:translate-x-[160px] md:translate-x-0 xl:-mt-[500px] xl:max-w-[1860px] xl:translate-x-[120px]"
      />
    {/if}
  </div>
</div>
