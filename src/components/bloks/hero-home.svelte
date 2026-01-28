<script lang="ts">
  import { clsx } from 'clsx';
  import { onDestroy } from 'svelte';
  import type { AnimationItem } from 'lottie-web';

  import type { HeroHomeStoryblok } from '$types/bloks';

  import { cn } from '$lib/utils/tailwind';
  import { intersectionObserver } from '$lib/actions/intersectionObserver';

  import Title from '$components/title.svelte';
  import PinkCone from '$components/heros/home/assets/pink-cone.webp';
  import Illustration from '$components/heros/home/assets/illustrations.webp';
  import HomeAnimation from '$components/heros/home/assets/home-animation.json';
  import OrangeHalfMoon from '$components/heros/home/assets/orange-half-moon.webp';
  import DashboardMobile from '$components/heros/home/assets/dashboard-mobile.webp';
  import { VIDEO_EXTENSIONS } from '$lib/constants';
  import { getFileExtension } from '$lib/strings/utils';

  export let blok: HeroHomeStoryblok;
  $: ({ title, video_mobile } = blok);

  let elementVid: HTMLElement;
  let animation: AnimationItem;
  let scrollY: number;
  let innerHeight: number;
  let animateFade = false;

  onDestroy(() => {
    if (animation) {
      animation.destroy();
    }
  });

  const load = async () => {
    const lottie = (await import('lottie-web/build/player/lottie_light')).default;

    animation = lottie.loadAnimation({
      container: elementVid,
      loop: false,
      autoplay: false,
      animationData: HomeAnimation
    });
  };

  $: totalFrames = animation?.totalFrames || 0;

  $: startCoordY = !elementVid ? 0 : elementVid.offsetTop - innerHeight / 2;

  $: currentFrame = !elementVid
    ? 0
    : Math.min(
        Math.floor((Math.max(0, scrollY - startCoordY) / elementVid.offsetHeight) * totalFrames),
        totalFrames
      );

  $: animation?.goToAndStop(currentFrame, true);

  $: value = Math.max(scrollY - elementVid?.offsetTop + 400, 0);
</script>

<svelte:window bind:scrollY bind:innerHeight />

<section
  class="-mt-top-nav-mobile overflow-hidden lg:-mt-top-nav"
  use:intersectionObserver={[
    (e) => {
      if (e.isIntersecting) {
        if (!animateFade) {
          animateFade = true;
          load();
        }
      }
    },
    { rootMargin: '0px 0px -95% 0px' }
  ]}
>
  <div class="container relative isolate mx-auto flex w-full max-w-container flex-col">
    <!-- Illustration -->
    <img
      alt=""
      src={Illustration}
      role="presentation"
      class="pointer-events-none -z-10 min-w-[900px] -translate-x-[36px] translate-y-top-nav-mobile self-center lg:min-w-[1400px] lg:-translate-y-[40px] xl:max-w-[1861px] xl:-translate-y-[40px]"
    />

    <div class="relative -mt-[800px] flex flex-col lg:-mt-[1300px] xl:-mt-[1780px]">
      {#if title && title[0]}
        <Title
          data={title[0]}
          descriptionClass="text-lg/snug lg:max-w-[532px]"
          titleClass="text-3xl lg:text-4xl lg:max-w-[854px]"
          class="mx-auto mt-[273px] px-20 md:mt-[360px] lg:max-w-[900px] xl:mt-[518px]"
        />
      {/if}

      <!-- Mobile -->
      <div class="relative aspect-auto w-full overflow-hidden rounded-24 lg:hidden">
        {#if video_mobile && VIDEO_EXTENSIONS.includes(getFileExtension(video_mobile.filename))}
          <video
            class="mt-40 aspect-auto h-full w-full rounded-[32px] object-cover p-20"
            muted
            src={video_mobile.filename}
            loop
            autoplay
            playsinline
            controls
          />
        {:else}
          <img
            src={DashboardMobile}
            alt=""
            class="ml-[50%] min-w-[600px] -translate-x-1/2 pl-[30px]"
          />
        {/if}
      </div>

      <!-- Desktop -->
      <div
        class={clsx(
          'elementDiv relative mx-auto mt-40 hidden w-full lg:block lg:h-full xl:mt-80',
          animateFade && 'min-w-[300px] animate-fade-in-once'
        )}
        bind:this={elementVid}
      >
        {#if animateFade}
          <img
            src={OrangeHalfMoon}
            alt=""
            role="presentation"
            class={cn(
              'pointer-events-none absolute -right-[40px] w-[120px] md:w-[200px] lg:-right-[80px] lg:top-[100px] lg:w-[400px]'
            )}
            style:transform="translateY({-value * -0.3}px)"
          />

          <img
            src={PinkCone}
            alt=""
            role="presentation"
            class={cn(
              'pointer-events-none absolute -left-[20px] bottom-0 w-[100px] md:w-[200px] lg:bottom-[100px] lg:w-[300px]'
            )}
            style:transform="translateY({-value * 0.2}px)"
          />
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  .elementDiv :global(g) {
    transition: transform 0.2s linear;
  }
</style>
