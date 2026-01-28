<script lang="ts">
  import type { KnowledgeCentreStoryblok } from '$types/bloks';

  import Tag from '$components/ui/tag.svelte';
  import { getValidIcon } from '$components/ui/icon/icon.svelte';
  import ResourcesDirectory from '$components/directory/resources-directory.svelte';

  export let blok: KnowledgeCentreStoryblok;
  $: ({ tag, title } = blok);
</script>

<ResourcesDirectory id={blok._uid}>
  <div slot="header" class="flex flex-col gap-24">
    {#if tag?.[0]}
      {@const { icon, label } = tag[0]}
      {@const typedIcon = getValidIcon(icon)}
      <Tag icon={typedIcon}>{label}</Tag>
    {/if}

    {#if title}
      <p class="font-serif text-2xl/tight">{title}</p>
    {/if}
  </div>
</ResourcesDirectory>
