<script context="module" lang="ts">
  export function countCaptions(
    inputs: (CalculatorInputSliderStoryblok | CalculatorInputToggleStoryblok)[]
  ): number {
    let count = 0;
    for (const input of inputs) {
      if (input?.caption?.length) {
        count++;
      }
    }
    return count;
  }

  export function calculateSliderMax(input: CalculatorInputSliderStoryblok): number {
    if (input.multiplier) {
      return calculatePercentage(parseInt(input.max || '100'), parseInt(input.multiplier ?? '1'));
    } else {
      return parseInt(input.max || '100');
    }
  }

  export function calculateSliderMin(input: CalculatorInputSliderStoryblok): number {
    if (input.multiplier) {
      return calculatePercentage(parseInt(input.min || '100'), parseInt(input.multiplier ?? '1'));
    } else {
      return parseInt(input.min || '100');
    }
  }

  export function calculateToggleMax(input: CalculatorInputToggleStoryblok): number {
    const firstOptionMultiplier = input.options[0]?.multiplier ?? '1';
    const secondOptionMultiplier = input.options[1]?.multiplier ?? '1';

    const maxMultiplier =
      Math.max(parseInt(firstOptionMultiplier), parseInt(secondOptionMultiplier)) / 100;

    return maxMultiplier;
  }

  export function calculateToggleMin(input: CalculatorInputToggleStoryblok): number {
    const firstOptionMultiplier = input.options[0]?.multiplier ?? '1';
    const secondOptionMultiplier = input.options[1]?.multiplier ?? '1';

    const maxMultiplier =
      Math.min(parseInt(firstOptionMultiplier), parseInt(secondOptionMultiplier)) / 100;

    return maxMultiplier;
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { linear } from 'svelte/easing';
  import { tweened } from 'svelte/motion';

  import type {
    CalculatorInputSliderStoryblok,
    CalculatorInputToggleStoryblok,
    CalculatorStoryblok
  } from '$types/bloks';

  import { cn } from '$lib/utils/tailwind';
  import {
    calculatePercentage,
    minMaxNormalization,
    roundToSixDecimalPlaces
  } from '$lib/utils/math';

  import Title from '$components/title.svelte';
  import Slider from '$components/ui/slider.svelte';
  import Switch from '$components/ui/switch.svelte';
  import Scribble from '$components/calculator/scribble.svelte';
  import { formatToCurrency } from '$lib/utils/string';

  export let blok: CalculatorStoryblok;
  $: ({ title, inputs, total_label } = blok);

  let firstInputValue = 0;
  let secondInputValue = 0;
  let minimumTotalPossible = 0;
  let maximumTotalPossible = 0;

  let isActive = false;
  let firstSliderValue = 0;
  let secondSliderValue = 0;

  let scribbleStrokeLength = 31900;

  let total = 0;
  let animationValue = tweened(0, { duration: 100, easing: linear });

  onMount(() => {
    // Set initial values for the sliders
    if (inputs?.[0].component === 'calculator_input_slider') {
      firstSliderValue = parseInt(inputs[0].initial_value ?? inputs[0]?.min ?? '0');
    }

    if (inputs?.[1].component === 'calculator_input_slider') {
      secondSliderValue = parseInt(inputs[1].initial_value ?? inputs[1]?.min ?? '0');
    }

    maximumTotalPossible = (inputs || [])
      .map((input) => {
        if (input.component === 'calculator_input_toggle') return calculateToggleMax(input);
        else return calculateSliderMax(input);
      })
      .reduce((accumulator, num) => (accumulator = num * accumulator), 1);
  });

  $: inputs?.map((input, i) => {
    if (input.component === 'calculator_input_slider') {
      if (i === 0) {
        firstInputValue = input.multiplier
          ? calculatePercentage(firstSliderValue, parseInt(input.multiplier))
          : firstSliderValue;
      } else if (i === 1) {
        secondInputValue = input.multiplier
          ? calculatePercentage(secondSliderValue, parseInt(input.multiplier))
          : secondSliderValue;
      }
    }

    if (input.component === 'calculator_input_toggle') {
      if (i === 0) {
        firstInputValue =
          typeof input.options[isActive ? 0 : 1].multiplier !== 'undefined'
            ? parseInt(input.options[isActive ? 1 : 0]?.multiplier ?? '1') / 100
            : 1;
      } else if (i === 1) {
        secondInputValue =
          typeof input.options[isActive ? 0 : 1].multiplier !== 'undefined'
            ? parseInt(input.options[isActive ? 1 : 0]?.multiplier ?? '1') / 100
            : 1;
      }
    }
  });

  $: {
    if (inputs && inputs.length === 2) {
      total = roundToSixDecimalPlaces(firstInputValue * secondInputValue);
    }

    if (maximumTotalPossible > 0) {
      animationValue.set(
        minMaxNormalization(total, minimumTotalPossible, maximumTotalPossible, scribbleStrokeLength)
      );
    }
  }

  $: formattedTotal = formatToCurrency(total);
</script>

<section class="relative isolate overflow-hidden">
  <div class="relative flex w-full flex-col px-20 pb-48 xl:mx-auto xl:max-w-container xl:px-48">
    {#if title?.[0]}
      <Title data={title[0]} class="w-full px-0 py-48 xl:mr-0 xl:pl-0" />
    {/if}

    <span class="horizontal-dashed-border z-10 h-1 w-full" />

    <div
      class="relative flex flex-col px-20 pt-20 xl:flex-row xl:items-center xl:justify-between xl:px-0 xl:pt-0"
    >
      <span
        role="presentation"
        class="pointer-events-none absolute -top-1 left-0 z-20 h-1 w-40 bg-gradient-to-r from-background to-transparent"
      />

      <span
        role="presentation"
        class="pointer-events-none absolute -top-1 right-0 z-20 h-1 w-40 bg-gradient-to-l from-background to-transparent"
      />

      <!-- Inputs -->
      <div class="flex w-full flex-col gap-64 xl:max-w-[50%]">
        {#if inputs?.length}
          {@const captionsLenght = countCaptions(inputs)}

          <div class="flex w-full flex-col gap-48 xl:flex-row xl:gap-60">
            {#each inputs as { caption }}
              {#if caption?.[0]}
                {@const { title, description } = caption[0]}
                <div
                  class={cn(
                    'space-y-6 text-md/snug tracking-wide text-foreground',
                    captionsLenght > 1 ? 'xl:max-w-[233px]' : 'xl:max-w-[417px]'
                  )}
                >
                  <p class="font-medium">{title}</p>
                  <p class="text-foreground text-opacity-72">{description}</p>
                </div>
              {/if}
            {/each}
          </div>

          <div
            class="item flex h-full w-full flex-col gap-48 xl:flex-row xl:items-center xl:gap-60"
          >
            {#each inputs as input, i}
              {#if input.component === 'calculator_input_toggle'}
                {@const { name, options } = input}
                <div
                  class="flex h-full w-full flex-col items-start justify-between gap-200 xl:max-w-[233px] xl:flex-1"
                >
                  {#if options?.length}
                    <div class="mt-auto w-full space-y-12">
                      <p
                        class="text-sm/snug font-medium tracking-wide text-foreground text-opacity-72"
                      >
                        {name}
                      </p>
                      <Switch
                        bind:checked={isActive}
                        class="w-full md:max-w-[300px] lg:max-w-[230px]"
                        itemClass="py-6 xl:py-6"
                      >
                        <div slot="unchecked">{options[0].name}</div>
                        <div slot="checked">{options[1].name}</div>
                      </Switch>
                    </div>
                  {/if}
                </div>
              {:else}
                {@const { name, min, max, increment, has_currency: hasCurrency } = input}
                <div
                  class="flex h-full w-full max-w-[300px] flex-col gap-64 xl:max-w-[233px] xl:flex-1 xl:items-start xl:justify-between"
                >
                  <div class="mt-auto flex w-full min-w-[230px] flex-col items-start space-y-12">
                    <p
                      class="text-sm/snug font-medium tracking-wide text-foreground text-opacity-72"
                    >
                      {name}
                    </p>

                    {#if i === 0}
                      <Slider
                        {hasCurrency}
                        bind:value={firstSliderValue}
                        min={min ? parseInt(min) : undefined}
                        max={max ? parseInt(max) : undefined}
                        step={increment ? parseInt(increment) : undefined}
                        class="w-full"
                      />
                    {:else}
                      <Slider
                        {hasCurrency}
                        bind:value={secondSliderValue}
                        min={min ? parseInt(min) : undefined}
                        max={max ? parseInt(max) : undefined}
                        step={increment ? parseInt(increment) : undefined}
                        class="w-full"
                      />
                    {/if}
                  </div>
                </div>
              {/if}
            {/each}
          </div>
        {/if}
      </div>

      <!-- Total -->
      {#if inputs}
        <div class="relative mt-48 xl:mt-0">
          <div
            class="absolute right-12 top-12 flex flex-col items-end text-foreground xl:right-[25px] xl:top-32"
          >
            {#if total_label}
              <p class="font-normal">{total_label}</p>
            {/if}
            {#if formattedTotal}
              <p class="font-serif text-2xl/tight lg:text-3xl">
                {formattedTotal}
              </p>
            {/if}
          </div>

          <Scribble animationValue={$animationValue} />
        </div>
      {/if}
    </div>
  </div>
</section>
