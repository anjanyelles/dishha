<script lang="ts">
  import { onDestroy } from 'svelte';
  import type { AnimationItem } from 'lottie-web';
  import { storyblokEditable } from '@storyblok/svelte';
  import type { ProductFeatureStoryblok, ProductFeaturesStoryblok } from '$types/bloks';

  import { cn } from '$lib/utils/tailwind';
  import { intersectionObserver } from '$lib/actions/intersectionObserver';

  import Title from '$components/title.svelte';
  import Goal from '../product-features/assets/goal.json';
  import Career from '../product-features/assets/career.json';
  import Demand from '../product-features/assets/demand.json';
  import Feedback from '../product-features/assets/feedback.json';
  import Meetings from '../product-features/assets/meetings.json';
  import Coaching from '../product-features/assets/coaching.json';
  import Reporting from '../product-features/assets/reporting.json';
  import Datadriven from '../product-features/assets/datadriven.json';
  import Customizable from '../product-features/assets/customizable.json';
  import InternalRole from '../product-features/assets/internal-role.json';
  import MeetingsPromote from '../product-features/assets/meetings-promote.json';

  import PinkSquare from '../product-features/assets/pink-square.webp';
  import YellowCone from '../product-features/assets/yellow-cone.webp';
  import GreenHalfMoon from '../product-features/assets/green-half-moon.webp';
  import YellowHalfMoon from '../product-features/assets/yellow-half-moon.webp';
  import OrangeHalfMoon from '../product-features/assets/orange-half-moon.webp';
  import OrangeHalfMoon2 from '../product-features/assets/orange-half-moon-2.webp';
  import GreenConeWithPinkSquares from '../product-features/assets/green-cone-with-pink-squares.webp';
  import { createMediaStore } from '$lib/stores/media';
  import { tablet } from '$lib/utils/media';

  export let blok: ProductFeaturesStoryblok;

  let animations: AnimationItem[] = [];
  let elementVids: HTMLElement[] = [];

  onDestroy(() => {
    animations.forEach((animation) => {
      if (animation) {
        animation.destroy();
      }
    });
  });

  const loadAnimation = async (
    elementVid: HTMLElement,
    variant: ProductFeatureStoryblok['variant']
  ) => {
    const lottie = (await import('lottie-web/build/player/lottie_light')).default;

    let animationData;

    switch (variant) {
      case 'meetings':
        animationData = Meetings;
        break;
      case 'goal':
        animationData = Goal;
        break;
      case 'reporting':
        animationData = Reporting;
        break;
      case 'demand':
        animationData = Demand;
        break;
      case 'customizable':
        animationData = Customizable;
        break;
      case 'datadriven':
        animationData = Datadriven;
        break;
      case 'meetings-promote':
        animationData = MeetingsPromote;
        break;
      case 'feedback':
        animationData = Feedback;
        break;
      case 'career':
        animationData = Career;
        break;
      case 'coaching':
        animationData = Coaching;
        break;
      case 'internal-role':
        animationData = InternalRole;
        break;
      default:
        animationData = Meetings;
        break;
    }

    const animation = lottie.loadAnimation({
      container: elementVid,
      loop: false,
      autoplay: false,
      animationData: animationData
    });

    return animation;
  };

  $: {
    if (blok.features && blok.features.length > 0) {
      animations = Array(blok.features.length).fill(null);
    }
  }

  const isMobile = createMediaStore(tablet);
</script>

<section class="relative isolate flex w-full flex-col overflow-hidden">
  {#each blok.features as feature, index}
    {@const { title, variant } = feature}
    <div
      use:storyblokEditable={feature}
      class="relative mx-auto flex h-full w-full max-w-container flex-col items-center justify-center py-20 lg:py-0 xl:min-w-[500px] xl:flex-row xl:items-start xl:justify-between xl:py-40"
      use:intersectionObserver={[
        (e) => {
          if (e.isIntersecting && !animations[index]) {
            setTimeout(
              function () {
                loadAnimation(elementVids[index], variant).then((animation) => {
                  animations[index] = animation;
                  animation.play();
                });
              },
              $isMobile ? 200 : 500
            );
          }
        },
        { threshold: [0.5] }
      ]}
    >
      {#if title[0]}
        <Title
          data={title[0]}
          class="px-20 py-48 xl:pl-160 xl:pr-0 xl:pt-80"
          titleClass="xl:min-w-[532px]"
          descriptionClass="xl:min-w-[532px]"
        />
      {/if}

      <div
        bind:this={elementVids[index]}
        class={cn(
          'relative isolate -z-10 flex min-h-[300px] min-w-[500px] items-center self-center px-0 lg:translate-x-0 xl:min-h-[500px] xl:min-w-[745px]',
          variant === 'reporting' && '-translate-x-28',
          variant === 'coaching' && 'min-w-[300px] -translate-x-28',
          variant === 'meetings-promote' && 'min-w-[400px] -translate-x-30'
        )}
      >
        {#if animations[index]}
          <!-- content here -->
          {#if variant === 'meetings'}
            <div
              class="pointer-events-none absolute -right-40 bottom-60 -z-10 hidden w-[360px] animate-fade-illustration xl:block"
            >
              <img role="presentation" src={OrangeHalfMoon2} alt="" />
            </div>
          {/if}

          {#if variant === 'customizable'}
            <div
              class="pointer-events-none absolute -right-20 -top-40 -z-10 hidden w-[240px] animate-fade-illustration xl:block"
            >
              <img role="presentation" src={GreenConeWithPinkSquares} alt="" />
            </div>
          {/if}

          {#if variant === 'demand'}
            <div
              class="pointer-events-none absolute -right-[100px] -top-50 -z-10 hidden w-[400px] animate-fade-illustration xl:block"
            >
              <img role="presentation" src={YellowHalfMoon} alt="" />
            </div>
          {/if}

          {#if variant === 'goal'}
            <div
              class="pointer-events-none absolute -top-[10px] right-[34px] -z-10 hidden w-80 animate-fade-illustration xl:block"
            >
              <img role="presentation" src={PinkSquare} alt="" />
            </div>
          {/if}

          {#if variant === 'feedback'}
            <div
              class="pointer-events-none absolute -right-[100px] -top-40 -z-10 hidden w-[400px] animate-fade-illustration xl:block"
            >
              <img role="presentation" src={GreenHalfMoon} alt="" />
            </div>
          {/if}

          {#if variant === 'career'}
            <div
              class="pointer-events-none absolute -right-[90px] -top-40 -z-10 hidden w-[360px] animate-fade-illustration xl:block"
            >
              <img role="presentation" src={OrangeHalfMoon} alt="" />
            </div>

            <div
              class="pointer-events-none absolute -right-36 bottom-60 -z-10 hidden w-80 animate-fade-illustration xl:block"
            >
              <img role="presentation" src={PinkSquare} alt="" />
            </div>
          {/if}

          {#if variant === 'internal-role'}
            <div
              class="pointer-events-none absolute right-20 top-20 -z-10 hidden w-[220px] animate-fade-illustration xl:block"
            >
              <img role="presentation" src={YellowCone} alt="" />
            </div>
          {/if}
        {/if}
      </div>
    </div>
  {/each}
</section>
