import { derived } from 'svelte/store';
import { page } from '$app/stores';

export const content = derived(page, ($page) => $page.data.content);
export const config = derived(content, ($content) => $content.config);
export const topnav = derived(content, ($content) => $content.topnav);
export const footer = derived(content, ($content) => $content.footer);
export const customers = derived(content, ($content) => $content.customers);
export const customerStories = derived(content, ($content) => $content.customerStories);
