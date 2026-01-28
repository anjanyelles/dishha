<script lang="ts">
  import { clsx } from 'clsx';
  import { onMount } from 'svelte';
  import type { HeroHomeStoryblok } from '$types/bloks';

  import Title from '$components/title.svelte';
  import PricingAnimation from '$components/heros/pricing/pricing-animation.json';
  import PricingAnimationMobile from '$components/heros/pricing/pricing-animation-mobile.json';

  export let blok: HeroHomeStoryblok;
  $: ({ title } = blok);

  let elementVid: HTMLElement;
  let elementVidMobile: HTMLElement;

  onMount(async () => {
    const lottie = (await import('lottie-web/build/player/lottie_light')).default;

    lottie.loadAnimation({
      container: elementVid,
      loop: true,
      autoplay: true,
      animationData: PricingAnimation
    });

    lottie.loadAnimation({
      container: elementVidMobile,
      loop: true,
      autoplay: true,
      animationData: PricingAnimationMobile
    });
  });
</script>

<section data-theme="yellow" class="flex w-full items-center overflow-hidden px-20">
  <div class="container relative mx-auto flex flex-col items-center justify-center">
    {#if title && title[0]}
      <Title
        data={title[0]}
        class="mt-48 max-w-[691px] lg:mt-72"
        titleClass="lg:text-4xl"
        descriptionClass="max-w-[532px]"
      />
    {/if}
    <div
      class={clsx('hidden min-w-[1600px] animate-fade-in-once lg:-mt-[200px] lg:block')}
      bind:this={elementVid}
    ></div>
    <div
      class={clsx('w-full min-w-[400px] animate-fade-in-once lg:hidden')}
      bind:this={elementVidMobile}
    ></div>
  </div>
</section>
