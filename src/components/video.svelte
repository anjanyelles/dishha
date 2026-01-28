<script lang="ts">
  import clsx from 'clsx';
  import type { AssetStoryblok } from '$types/bloks';

  export let videoClass: string | undefined = undefined;

  export let video: AssetStoryblok;
  export let loop = false;
  export let caption: string | undefined = undefined;
</script>

{#if video?.filename}
  <figure class={clsx('h-auto w-full', $$restProps.class)}>
    <video
      class={clsx('rounded-3xl bg-background', videoClass)}
      muted
      src={video.filename}
      {loop}
      autoplay
      playsinline
    />
    {#if !!caption}
      <figcaption class="mt-8 text-xs/snug text-foreground">
        {caption}
      </figcaption>
    {/if}
  </figure>
{/if}
