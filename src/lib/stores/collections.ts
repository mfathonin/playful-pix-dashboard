import type { Collection } from '$lib/models/collections';
import { writable } from 'svelte/store';

export const collectionsStore = writable<{
	collections: Collection[];
	expiredAt: Date | undefined;
}>({
	collections: [],
	expiredAt: undefined
});
