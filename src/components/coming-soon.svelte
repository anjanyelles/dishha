<script lang="ts">
  import { string } from '$lib/strings';

  import { sanitizeSlug } from '$lib/utils/paths';

  import Tag from '$components/ui/tag.svelte';
  import Button from '$components/ui/button.svelte';
  import { getValidIcon } from '$components/ui/icon/icon.svelte';
  import ComingSoon from '$components/coming-soon/assets/coming-soon.webp';
</script>

<section
  data-theme="yellow"
  class="relative isolate flex h-full w-full flex-col overflow-hidden bg-background"
>
  <div class="relative flex w-full flex-col items-center lg:mx-auto xl:max-w-container">
    <div class="flex flex-col items-center gap-24 pt-80">
      <Tag icon={getValidIcon(string('comingSoon.tag.icon'))}>{string('comingSoon.tag.label')}</Tag>

      <h1
        class="max-w-[818px] px-20 text-center font-serif text-3xl font-normal lg:px-0 lg:text-4xl"
      >
        {string('comingSoon.title')}
      </h1>

      <Button as="a" icon="arrow-right" href={sanitizeSlug('/')}>{string('comingSoon.cta')}</Button>
    </div>
    <img
      src={ComingSoon}
      alt=""
      role="presentation"
      class="pointer-events-none -mt-[160px] aspect-auto min-w-[1000px] self-center md:-mt-0 xl:-mt-[300px] xl:min-w-[1674px] xl:-translate-x-[60px]"
    />
  </div>
</section>
