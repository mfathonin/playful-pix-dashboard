import { getCollections } from '$lib/repositories/collections';
import { superValidate } from 'sveltekit-superforms/server';
import type { LayoutServerLoad } from './$types';
import { crudCollectionSchema } from '$lib/models/contents';
import { collectionsStore } from '$lib/stores/collections';
import { get } from 'svelte/store';
import type { Collection } from '$lib/models/collections';

export const load = (async ({ params, locals }) => {
	const user = locals.user;
	let collections: Collection[] = [];
	const { collectionId } = params;
	const expiredAt = get(collectionsStore).expiredAt;
	try {
		const isExpired = expiredAt === undefined || expiredAt < new Date();
		if (isExpired) {
			collections = await getCollections();
			collectionsStore.set({
				collections,
				expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 12)
			});
		} else {
			collections = get(collectionsStore).collections;
		}
	} catch (error) {
		console.error(error);
	}

	const formCreateCollection = await superValidate(crudCollectionSchema);

	return { collections, expiredAt, collectionId, formCreateCollection, user };
}) satisfies LayoutServerLoad;
