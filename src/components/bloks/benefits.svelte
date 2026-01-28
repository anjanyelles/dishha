<script lang="ts">
  import type { BenefitsStoryblok } from '$types/bloks';

  import { cn } from '$lib/utils/tailwind';
  import { isCmsStory } from '$lib/utils/cms';

  import Title from '$components/title.svelte';
  import PostIt from '$components/post-it.svelte';
  import Benefit from '$components/benefits/benefit.svelte';
  import CompanyItem from '$components/benefits/company-item.svelte';
  import FeatureItem from '$components/benefits/feature-item.svelte';
  import BenefitDetail from '$components/benefits/benefit-detail.svelte';
  import { customerStories } from '$lib/content';

  export let blok: BenefitsStoryblok;
  $: ({ title, post_it: postIt, items } = blok);
</script>

<section
  class={cn(
    'flex flex-col overflow-hidden pb-48 xl:container xl:mx-auto xl:max-w-container',
    postIt?.[0] && 'lg:grid lg:px-48 xl:grid-cols-[812px_1fr]',
    items.some((item) => item.component === 'benefit-details') && 'lg:pb-64'
  )}
>
  <div class="flex flex-col">
    {#if title?.[0]}
      {@const { alignment } = title[0]}
      <Title
        data={title[0]}
        class={cn(
          'h-fit w-full max-w-[647px] px-20 py-48 lg:px-0',
          alignment === 'center' && 'mx-auto',
          !postIt?.[0] && 'lg:pl-48'
        )}
      />
    {/if}

    {#if postIt && postIt[0]}
      {@const { type, quote, customer_story } = postIt[0]}
      {@const customerStory =
        typeof customer_story === 'string'
          ? $customerStories?.find((item) => item.uuid === customer_story)
          : $customerStories?.find((item) => item.uuid === customer_story?.uuid)}

      {@const author =
        customerStory?.content?.customer && isCmsStory(customerStory?.content?.customer)
          ? customerStory?.content?.customer.content
          : undefined}

      <div class="z-10 col-span-1 hidden w-fit self-start px-20 xl:mt-48 xl:block">
        <PostIt
          {type}
          {quote}
          {author}
          size="medium"
          {customerStory}
          class="w-full max-w-[400px] lg:w-[400px]"
        />
      </div>
    {/if}
  </div>

  {#if items?.length}
    <div class="relative lg:row-span-2">
      <!-- Divider -->
      {#if postIt?.[0]}
        <!-- Top dashed line -->
        <span
          class={cn(
            'horizontal-dashed-border absolute top-0 hidden h-1 w-full xl:block',
            postIt?.[0] && 'xl:vertical-dashed-border xl:left-0 xl:h-full xl:w-1'
          )}
        />

        <!-- Top Fade -->
        <span
          role="presentation"
          class="absolute left-0 top-0 z-10 h-full w-1 bg-gradient-to-b from-background to-transparent"
        />

        <!-- Bottom Fade -->
        <span
          role="presentation"
          class="absolute bottom-0 left-0 z-10 hidden h-full w-1 bg-gradient-to-t from-background to-transparent xl:block"
        />
      {/if}

      <div
        class={cn(
          'flex flex-wrap px-20 xl:container lg:px-0 xl:mx-auto',
          postIt?.[0] && 'pb-16 lg:pt-68',
          items.some((item) => item.component === 'benefit' || item.component === 'company-item') &&
            'md:gap-48 xl:gap-0'
        )}
      >
        {#each items as item, i}
          {@const { component } = item}
          {#if component === 'feature-item'}
            <FeatureItem
              data={item}
              class={cn('max-w-[500px] basis-[463px]', postIt?.[0] && ' lg:pl-48')}
            />
          {/if}

          {#if component === 'benefit'}
            <Benefit data={item} />
          {/if}

          {#if component === 'benefit-details'}
            <div class="relative mt-48 first:mt-0 xl:mt-0">
              <BenefitDetail data={item} />

              {#if items?.length > 1 && i === 0}
                <span
                  class={cn(
                    'vertical-dashed-border absolute right-0 top-0 hidden h-full w-1 xl:block'
                  )}
                />

                <!-- Top Fade -->
                <span
                  role="presentation"
                  class={cn(
                    'absolute right-0 top-0 z-10 hidden h-full w-1 bg-gradient-to-b from-background to-transparent  xl:block'
                  )}
                />

                <!-- Bottom Fade -->
                <span
                  role="presentation"
                  class={cn(
                    'absolute bottom-0 right-0 z-10 hidden h-full w-1 bg-gradient-to-t from-background to-transparent xl:block'
                  )}
                />
              {/if}
            </div>
          {/if}

          {#if component === 'company-item'}
            <CompanyItem data={item} />
          {/if}
        {/each}
      </div>
    </div>
  {/if}

  {#if postIt && postIt[0]}
    {@const { type, quote, customer_story } = postIt[0]}
    {@const customerStory =
      typeof customer_story === 'string'
        ? $customerStories?.find((item) => item.uuid === customer_story)
        : $customerStories?.find((item) => item.uuid === customer_story?.uuid)}

    {@const author =
      customerStory?.content?.customer && isCmsStory(customerStory?.content?.customer)
        ? customerStory?.content?.customer.content
        : undefined}

    <div class="z-10 w-fit self-start px-20 xl:mt-48 xl:hidden">
      <PostIt
        {type}
        {quote}
        {author}
        size="medium"
        {customerStory}
        class="w-full max-w-[400px] lg:w-[400px]"
      />
    </div>
  {/if}
</section>
