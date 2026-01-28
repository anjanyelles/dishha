import {
  apiPlugin,
  storyblokInit,
  type ISbStoryData,
  useStoryblokBridge,
  type SbSDKOptions
} from '@storyblok/js';
import { onMount } from 'svelte';
import { error, type Cookies } from '@sveltejs/kit';
import { PUBLIC_STORYBLOK_TOKEN } from '$env/static/public';
import { RichTextSchema, type ISbStoriesParams, type StoryblokClient } from '@storyblok/svelte';

import { PREVIEW_COOKIE_KEY } from './constants';
import type {
  ConfigContentStoryblok,
  CustomerStoryStoryblok,
  CustomerStoryblok,
  FooterConfigurationStoryblok,
  NavigationConfigurationStoryblok,
  ResourceStoryblok
} from '$types/bloks';
import { isStatusError } from './utils/error';
import { get } from 'svelte/store';
import { page } from '$app/stores';

export const RESOLVE_RELATIONS: string[] = [
  'post-it.customer_story',
  'customer-story.customer',
  'synced-block.synced_block',
  'story-link.link'
];

export const getStoryVersion = (cookies: Cookies) =>
  cookies.get(PREVIEW_COOKIE_KEY) ? 'draft' : 'published';

export const getStoryblok = (apiOptions: SbSDKOptions['apiOptions'] = {}) => {
  const { storyblokApi } = storyblokInit({
    accessToken: PUBLIC_STORYBLOK_TOKEN,
    use: [apiPlugin],
    apiOptions: {
      https: true,
      ...apiOptions
    }
  });

  return storyblokApi as NonNullable<ReturnType<typeof storyblokInit>['storyblokApi']>;
};

export const { storyblokApi } = storyblokInit({
  accessToken: PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    https: true
  },
  richText: { schema: RichTextSchema }
});
export const storyblok = storyblokApi as StoryblokClient;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function startStoryblokBridge<T extends { story: ISbStoryData<any> }>(
  id: number,
  onNewStory: (newStory: T['story']) => void
) {
  onMount(async () => {
    getStoryblok();
    useStoryblokBridge(id, onNewStory);
  });
}

export async function getLayoutContent({ version }: { version: 'draft' | 'published' }) {
  let config: ConfigContentStoryblok | null = null;
  let topnav: NavigationConfigurationStoryblok | null = null;
  let footer: FooterConfigurationStoryblok | null = null;

  let customers: ISbStoryData<CustomerStoryblok>[] = [];
  let customerStories: ISbStoryData<CustomerStoryStoryblok>[] = [];

  const options = {
    version,
    resolve_links: 'url',
    cv: Date.now()
  } as const;

  try {
    const [configRes, topnavRes, footerRes, customersRes, customerStoriesRes] = await Promise.all([
      // config
      storyblok.get('cdn/stories/general-configuration', {
        ...options,
        resolve_relations: RESOLVE_RELATIONS
      }),
      // topnav
      storyblok.get('cdn/stories/general-configuration/top-navigation-configuration', {
        ...options,
        resolve_relations: RESOLVE_RELATIONS
      }),
      // footer
      storyblok.get('cdn/stories/general-configuration/footer-configuration', {
        ...options,
        resolve_relations: RESOLVE_RELATIONS
      }),
      // customers
      storyblok.get('cdn/stories', {
        ...options,
        per_page: 100,
        resolve_links: 'url',
        resolve_relations: RESOLVE_RELATIONS,
        content_type: 'customer',
        sort_by: 'created_at:asc'
      }),
      // customer stories
      storyblok.get('cdn/stories', {
        ...options,
        per_page: 100,
        resolve_links: 'url',
        resolve_relations: RESOLVE_RELATIONS,
        content_type: 'customer-story',
        sort_by: 'created_at:asc'
      })
    ]);

    config = configRes.data.story.content;
    topnav = topnavRes.data.story.content;
    footer = footerRes.data.story.content;
    customers = customersRes.data.stories;
    customerStories = customerStoriesRes.data.stories;
  } catch (err) {
    if (isStatusError(err) && err.status === 404) throw error(404, 'Not found');

    throw new Error('Failed to load layout data', { cause: err });
  }

  return {
    config,
    topnav,
    footer,
    customers,
    customerStories
  };
}

export const fetchLatestResources = async (
  options: { version?: 'draft' | 'published'; fetch?: typeof fetch } = {}
) => {
  const storyblok = getStoryblok({ fetch: options.fetch || fetch });

  const {
    data: { stories }
  } = await storyblok.get('cdn/stories', {
    per_page: 3,
    content_type: 'resource',
    version: options.version || 'published',
    starts_with: 'pages/knowledge-centre/',
    sort_by: 'published_at:desc'
  });

  return stories as ISbStoryData<ResourceStoryblok>[];
};

export const getResources = async (params: Omit<ISbStoriesParams, 'content_type'> = {}) => {
  return await storyblok.get('cdn/stories', {
    starts_with: 'pages/',
    content_type: 'resource',
    version: get(page).data.version,
    resolve_relations: RESOLVE_RELATIONS,
    sort_by: 'published_at:desc',
    cv: Date.now(),
    ...params
  });
};

export const getIntegrations = async (params: Omit<ISbStoriesParams, 'content_type'> = {}) => {
  return await storyblok.get('cdn/stories', {
    starts_with: 'database/integrations',
    content_type: 'integration',
    version: get(page).data.version,
    resolve_relations: RESOLVE_RELATIONS,
    sort_by: 'published_at:desc',
    cv: Date.now(),
    ...params
  });
};
