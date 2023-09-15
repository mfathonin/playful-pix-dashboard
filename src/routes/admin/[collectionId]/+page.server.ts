import { getCollections } from '$lib/repositories/collections';
import { getContentsByGroupId } from '$lib/repositories/contents';
import { collectionsStore } from '$lib/stores/collections';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { crudContentSchema } from '$lib/models/contents';

export const load: PageServerLoad = async ({ params }) => {
	const { collectionId } = params;
	let collection;
	let contents;
	try {
		const expiredAt = get(collectionsStore).expiredAt;
		const isExpired = expiredAt === undefined || expiredAt < new Date();
		if (isExpired) {
			const collections = await getCollections();
			collection = collections.find((c) => c.id === collectionId);
			collectionsStore.set({
				collections,
				expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 12) // 12 hour
			});
		} else collection = get(collectionsStore).collections.find((c) => c.id === collectionId);
		contents = await getContentsByGroupId(collectionId);
	} catch (error) {
		console.error(error);
	}

	if (collection === undefined) throw redirect(303, '/admin');

	const formCreateContent = superValidate(crudContentSchema);

	return { collection, collectionId, formCreateContent, contents };
};
