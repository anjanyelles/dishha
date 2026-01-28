<script lang="ts">
  import type { AssetStoryblok } from '$types/bloks';

  import { page } from '$app/stores';

  import { string } from '$lib/strings';
  import { VIDEO_EXTENSIONS } from '$lib/constants';
  import { getImageAttributes } from '$lib/utils/cms';
  import { getFileExtension } from '$lib/strings/utils';

  export let title: undefined | string = undefined;
  export let description: undefined | string = undefined;
  export let image: undefined | AssetStoryblok | string = undefined;
</script>

<svelte:head>
  <link
    rel="canonical"
    href={$page.data.story?.content?.seo_canonical_url ||
      `${$page.url.origin}${$page.url.pathname}`}
  />

  <title>{title || $page.data.story?.content?.seo_title || string('seo.defaultTitle')}</title>
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={string('seo.defaultTitle')} />
  <meta
    name="description"
    content={description ||
      $page.data.page?.story?.content?.seo_description ||
      string('seo.defaultDescription')}
  />
  <meta
    property="og:title"
    content={title || $page.data.page?.story?.content?.seo_title || string('seo.defaultTitle')}
  />
  <meta
    property="twitter:title"
    content={title || $page.data.page?.story?.content?.seo_title || string('seo.defaultTitle')}
  />
  <meta
    property="og:description"
    content={description ||
      $page.data.page?.story?.content?.seo_description ||
      string('seo.defaultDescription')}
  />
  <meta
    property="twitter:description"
    content={description ||
      $page.data.page?.story?.content?.seo_description ||
      string('seo.defaultDescription')}
  />
  <meta property="og:url" content={$page.url.toString()} />
  <meta property="og:type" content="website" />

  {#if typeof image !== 'string' && image?.filename && !VIDEO_EXTENSIONS.includes(getFileExtension(image.filename))}
    {@const { src } = getImageAttributes(image, { size: [1200, 630] })}
    <meta property="og:image" content={src} />
    <meta property="twitter:image" content={src} />
  {:else if $page.data.page?.story?.content?.seo_og_image?.filename}
    {@const { src } = getImageAttributes($page.data.page?.story?.content?.seo_og_image, {
      size: [1200, 630]
    })}
    <meta property="og:image" content={src} />
    <meta property="twitter:image" content={src} />
  {:else if typeof image === 'string'}
    <meta property="og:image" content={image} />
    <meta property="twitter:image" content={image} />
  {:else}
    <meta property="og:image" content="{$page.url.origin}/og.png" />
    <meta property="twitter:image" content="{$page.url.origin}/og.png" />
  {/if}
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
</svelte:head>
