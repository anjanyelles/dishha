<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import type { AssetStoryblok } from '$types/bloks';

  import { getImageAttributes } from '$lib/utils/cms';
  import { intersectionObserver } from '$lib/actions/intersectionObserver';

  import RightArm from './assets/right-arm.svelte';
  import LeftArm from './assets/left-arm.svelte';

  import PinkCone from './assets/pink-cone.webp';
  import BlueSquare from './assets/blue-square.webp';
  import PurpleCone from './assets/purple-cone.webp';
  import OrangeHalfCircle from './assets/orange-half-circle.webp';

  export let awardOne: AssetStoryblok | undefined = undefined;
  export let awardTwo: AssetStoryblok | undefined = undefined;
  export let awardThree: AssetStoryblok | undefined = undefined;

  let isIntersecting = false;
</script>

<div
  use:intersectionObserver={[
    (e) => {
      if (e.isIntersecting) {
        if (!isIntersecting) {
          isIntersecting = true;
        } else {
          isIntersecting = false;
        }
      }
    },
    { threshold: 0.8 }
  ]}
  class="relative mt-48 flex h-[478px] w-full lg:mt-0"
>
  <span
    class="absolute left-1/2 z-20 h-[400px] w-[100vw] min-w-[1000px] max-w-[1440px] -translate-x-1/2 -translate-y-26 rounded-[0_0_70%_80%/0_0_100%_100%] bg-background md:min-w-[1440px] md:-translate-y-[40px] lg:-top-[20px] lg:-translate-y-0"
  />

  <div class="container relative mx-auto mt-[10px] w-full">
    <!-- Arms -->
    <!-- Left Arm Fade -->
    <span
      role="presentation"
      class="pointer-events-none absolute -right-[300px] -top-[300px] z-50 hidden h-full w-[400px] bg-gradient-to-l from-background via-background to-transparent 2xl:block"
    />

    <!-- Right Arm Fade -->
    <span
      role="presentation"
      class="pointer-events-none absolute -left-[200px] -top-[300px] z-50 hidden h-full w-[400px] bg-gradient-to-r from-background via-background to-transparent 2xl:block"
    />

    <LeftArm
      class={twMerge(
        'pointer-events-none absolute left-[60%] z-40 origin-top-left -translate-y-[24%] rotate-[18deg] scale-[60%] stroke-foreground text-background transition-transform duration-700 ease-in-out md:-translate-y-[62%] md:rotate-[30deg] md:scale-100 lg:-translate-y-[62%] xl:-translate-y-[63%]',
        isIntersecting && `rotate-[24deg] md:rotate-[26deg] lg:rotate-[34deg]`
      )}
    />

    <RightArm
      class={twMerge(
        'pointer-events-none  absolute right-[49%] z-40 origin-top-right -translate-y-[22%] -rotate-[18deg] scale-[60%] stroke-foreground text-background transition-transform duration-700 ease-in-out md:w-auto md:-translate-y-[58%] md:-rotate-[30deg] md:scale-100',
        isIntersecting && `-rotate-[24deg] md:-rotate-[26deg] lg:-rotate-[34deg]`
      )}
    />

    <!-- Poligons -->
    <img
      src={OrangeHalfCircle}
      alt=""
      role="presentation"
      class={twMerge(
        'pointer-events-none absolute right-[5%] top-[24%] z-20 origin-[bottom_center] transition-all duration-500 ease-linear md:right-[25%] md:top-[26%]',
        isIntersecting && `top-[29%] -rotate-[20deg] md:top-[26%]`
      )}
    />
    <img
      src={BlueSquare}
      alt=""
      role="presentation"
      class={twMerge(
        'pointer-events-none absolute right-[15%] top-[8%] z-20 hidden rotate-[36deg] transition-all duration-500 ease-linear xl:block',
        isIntersecting && 'top-[25%] -rotate-[20deg]'
      )}
    />
    <img
      src={PinkCone}
      alt=""
      role="presentation"
      class={twMerge(
        'pointer-events-none absolute -top-[10%] right-1/2 z-20 -rotate-[85deg] transition-all duration-500 ease-linear',
        isIntersecting &&
          '-top-[1%] right-[39%] -rotate-[20deg] md:-top-[1%] md:right-[49%] md:-rotate-[20deg]  xl:right-[49%]  xl:top-[8%] xl:-rotate-[24deg]'
      )}
    />
    <img
      src={PurpleCone}
      alt=""
      role="presentation"
      class={twMerge(
        'pointer-events-none absolute left-[28%] top-[10%] z-20 hidden -rotate-[60deg] transition-all duration-500 ease-linear xl:block',
        isIntersecting && 'left-[28%] top-[13%] rotate-[2deg]'
      )}
    />

    <!-- Awards -->
    {#if awardOne}
      <img
        src={getImageAttributes(awardOne).src}
        alt=""
        role="presentation"
        class={twMerge(
          'pointer-events-none absolute left-[20%] top-[17%] z-20 w-[80px] -rotate-[20deg] transition-all duration-500 ease-linear',
          isIntersecting &&
            'left-[19%] top-[46%] -rotate-[11deg] md:top-[34%] md:-rotate-[3deg] xl:top-[32%]'
        )}
      />
    {/if}

    {#if awardTwo}
      <img
        src={getImageAttributes(awardTwo).src}
        alt=""
        role="presentation"
        class={twMerge(
          'pointer-events-none absolute left-[44%] top-[28%] z-20 w-[80px] transition-all duration-500 ease-linear',
          isIntersecting && 'left-[43%] top-[49%] -rotate-[25deg] md:top-[44%] xl:top-[39%]'
        )}
      />
    {/if}

    {#if awardThree}
      <img
        src={getImageAttributes(awardThree).src}
        alt=""
        role="presentation"
        class={twMerge(
          'pointer-events-none absolute right-[23%] top-[4%] z-20 w-[80px] transition-all duration-500 ease-linear',
          isIntersecting &&
            'right-[12%] top-[47%] -rotate-[43deg] md:right-[23%] md:top-[42%] xl:top-[37%]'
        )}
      />
    {/if}
  </div>
</div>
