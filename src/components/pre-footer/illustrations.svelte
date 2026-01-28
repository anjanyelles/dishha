<script lang="ts">
  import LeftHand from './assets/left-hand.svg';
  import LeftHand1 from './assets/left-hand1.svg';
  import LeftHand2 from './assets/left-hand2.svg';
  import LeftHand3 from './assets/left-hand3.svg';
  import RightHand from './assets/right-hand.svg';
  import RightHand1 from './assets/right-hand1.svg';
  import RightHand2 from './assets/right-hand2.svg';
  import RightHand3 from './assets/right-hand3.svg';
  import QuarterGreen from './assets/quarter-green.svg';
  import HalfOrange from './assets/half-orange.svg';
  import PinkTriangle from './assets/pink-triangle.svg';
  import Heart from './assets/heart.svg';
  import SquareGreen from './assets/sqaure-green.svg';
  import Paper1 from './assets/paper1.svg';
  import Paper2 from './assets/paper2.svg';
  import Star from './assets/star.svg';
  import Dot from './assets/dot.svg';
  import Smoke1 from './assets/smoke1.svg';
  import Smoke2 from './assets/smoke2.svg';
  import { cn } from '$lib/utils/tailwind';
  import { createMediaStore } from '$lib/stores/media';
  import { tablet } from '$lib/utils/media';

  const isMobile = createMediaStore(tablet);
  let handAnimation = false;
</script>

<div
  class="relative flex h-[414px] w-full items-end justify-center md:justify-center md:gap-80 lg:justify-around lg:gap-20"
>
  <!-- Hands with poligons -->
  <div
    class="group relative -bottom-26 hidden shrink-0 scale-75 gap-20 lg:-bottom-10 lg:flex lg:scale-100"
  >
    <img
      class="animate-sparkle absolute -left-20 bottom-112 delay-150"
      role="presentation"
      src={Dot}
      alt=""
    />
    <img
      class="animate-sparkle absolute -right-[20px] -top-80"
      role="presentation"
      src={Star}
      alt=""
    />
    <img
      class="z-10 transition-all duration-400 group-hover:-translate-y-6"
      role="presentation"
      src={LeftHand}
      alt=""
    />
    <img
      class="z-10 transition-all duration-400 group-hover:translate-y-6"
      role="presentation"
      src={RightHand}
      alt=""
    />
    <img
      class="absolute -top-[78px] left-[39px] transition-all duration-400 group-hover:rotate-[18deg]"
      role="presentation"
      src={QuarterGreen}
      alt=""
    />
    <img
      class="absolute -top-[138px] left-[39px] transition-all duration-400 group-hover:-rotate-[10deg]"
      role="presentation"
      src={HalfOrange}
      alt=""
    />
  </div>

  <!-- Hands with pink cone -->
  <div
    class="md:scale-1 group relative -bottom-26 hidden shrink-0 scale-75 gap-64 lg:-bottom-10 lg:flex lg:scale-100"
  >
    <img
      class="animate-sparkle absolute -right-[20px] -top-30"
      role="presentation"
      src={Dot}
      alt=""
    />
    <img
      class="z-10 origin-bottom transition-all duration-400 group-hover:rotate-[18deg]"
      role="presentation"
      src={LeftHand1}
      alt=""
    />
    <img
      class="z-10 origin-bottom transition-all duration-400 group-hover:-rotate-[18deg]"
      role="presentation"
      src={RightHand1}
      alt=""
    />
    <img
      class="absolute left-[74px] top-4 z-10 transition-all duration-400 group-hover:-top-[120px] group-hover:left-36 group-hover:rotate-[-42deg] group-hover:scale-50"
      role="presentation"
      src={PinkTriangle}
      alt=""
    />
    <img
      class="absolute left-[104px] top-[50px] -rotate-[24deg] transition-all duration-400 group-hover:-top-[94px] group-hover:left-[134px] group-hover:rotate-[24deg]"
      role="presentation"
      src={Heart}
      alt=""
    />
    <img
      class="absolute left-[104px] top-[50px] -rotate-[12deg] scale-75 transition-all duration-400 group-hover:-top-[40px] group-hover:left-[104px] group-hover:-rotate-[24deg]"
      role="presentation"
      src={Heart}
      alt=""
    />
  </div>

  <!-- Hands with cups -->
  <div
    role="presentation"
    class="group relative -bottom-52 flex shrink-0 scale-75 gap-128 lg:-bottom-16 lg:scale-100"
    on:focus
    on:mouseover={() => (handAnimation = true)}
    on:mouseleave={() => (handAnimation = false)}
  >
    <img
      class="animate-sparkle absolute -right-[50px] -top-30"
      role="presentation"
      src={Dot}
      alt=""
    />
    <img
      class="animate-sparkle absolute bottom-[110px] right-[180px]"
      role="presentation"
      src={Star}
      alt=""
    />
    <img
      class={cn(
        'absolute -top-30 right-[250px] opacity-0 transition-all',
        $isMobile ? '-top-56 opacity-100' : 'group-hover:-top-56 group-hover:opacity-100',
        handAnimation ? 'duration-400' : 'duration-150'
      )}
      role="presentation"
      src={Smoke1}
      alt=""
    />
    <img
      class={cn(
        'absolute -top-30 right-[110px] opacity-0 transition-all',
        $isMobile ? '-top-88 opacity-100' : 'group-hover:-top-88 group-hover:opacity-100',
        handAnimation ? 'duration-400' : 'duration-150'
      )}
      role="presentation"
      src={Smoke2}
      alt=""
    />
    <img
      class={cn(
        `origin-bottom`,
        $isMobile && 'rotate-[12deg]',
        !$isMobile && handAnimation ? 'animate-hand-cup-left' : 'animate-hand-cup-left-reverse'
      )}
      role="presentation"
      src={LeftHand2}
      alt=""
    />
    <img
      class={cn(
        `origin-bottom`,
        $isMobile && 'rotate-[-10deg]',
        !$isMobile && handAnimation ? 'animate-hand-cup-right' : 'animate-hand-cup-right-reverse'
      )}
      role="presentation"
      src={RightHand2}
      alt=""
    />
  </div>

  <!-- Hands with with money -->
  <div
    class="group relative -bottom-52 hidden shrink-0 scale-75 gap-24 md:flex lg:-bottom-16 lg:scale-100"
  >
    <img
      class="animate-sparkle absolute -right-24 bottom-112"
      role="presentation"
      src={Star}
      alt=""
    />
    <img
      class={cn(
        'z-10 origin-bottom transition-all duration-400',
        $isMobile ? '-rotate-[13.5deg]' : 'group-hover:-rotate-[13.5deg]'
      )}
      role="presentation"
      src={LeftHand3}
      alt=""
    />
    <img
      class={cn(
        'z-10 origin-bottom transition-all duration-400',
        $isMobile ? 'rotate-[13.5deg]' : 'group-hover:rotate-[13.5deg]'
      )}
      role="presentation"
      src={RightHand3}
      alt=""
    />
    <img
      class={cn(
        'absolute -top-[40px] left-[54px] z-0 opacity-0 transition-all duration-400',
        $isMobile
          ? '-left-[12px] -top-[110px] -rotate-12 opacity-100'
          : 'group-hover:-left-[12px] group-hover:-top-[110px] group-hover:-rotate-12 group-hover:opacity-100'
      )}
      role="presentation"
      src={Paper2}
      alt=""
    />
    <img
      class={cn(
        'absolute -top-[40px] left-[54px] z-0 opacity-0 transition-all duration-400',
        $isMobile ? 'rotate-12 opacity-100' : 'group-hover:rotate-12 group-hover:opacity-100'
      )}
      role="presentation"
      src={Paper1}
      alt=""
    />
    <img
      class={cn(
        'absolute -top-[40px] left-[54px] z-0 rotate-45 transition-all duration-400',
        $isMobile
          ? '-top-[160px] left-[100px] rotate-[76deg]'
          : 'group-hover:-top-[160px] group-hover:left-[100px] group-hover:rotate-[76deg]'
      )}
      role="presentation"
      src={SquareGreen}
      alt=""
    />
  </div>
</div>

<style lang="postcss">
  @keyframes hand-cup-left {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(13.5deg);
    }
    100% {
      transform: rotate(8deg);
    }
  }

  .animate-hand-cup-left {
    animation: hand-cup-left 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  @keyframes hand-cup-left-reverse {
    0% {
      transform: rotate(8deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  .animate-hand-cup-left-reverse {
    animation: hand-cup-left-reverse 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes hand-cup-right {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(-13.5deg);
    }
    100% {
      transform: rotate(-8deg);
    }
  }

  .animate-hand-cup-right {
    animation: hand-cup-right 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  @keyframes hand-cup-right-reverse {
    0% {
      transform: rotate(-8deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  .animate-hand-cup-right-reverse {
    animation: hand-cup-right-reverse 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes sparkle {
    0% {
      transform: scale(0.5);
    }
    50% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(0.5);
    }
  }

  .animate-sparkle {
    animation: sparkle 2500ms ease-in-out infinite;
  }
</style>
