import { getCollections } from '$lib/repositories/collections';
import { superValidate } from 'sveltekit-superforms/server';
import type { LayoutServerLoad } from './$types';
import { crudCollectionSchema } from '$lib/models/contents';

export const load = (async ({ params, locals }) => {
	const user = locals.user;

	const { collectionId } = params;
	let collections;
	try {
		collections = await getCollections();
	} catch (error) {
		console.error(error);
	}

	const formCreateCollection = await superValidate(crudCollectionSchema);

	console.log(4950, { collections, collectionId });
	return { collections, collectionId, formCreateCollection, user };
}) satisfies LayoutServerLoad;
