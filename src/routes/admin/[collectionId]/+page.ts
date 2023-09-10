import { editContentSchema } from '$lib/models/contents';
import { getContentsByGroupId } from '$lib/repositories/contents';
import { getCollectionById } from '$lib/repositories/collections';
import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const { collectionId } = params;
	let group;
	let collections;
	try {
		group = await getCollectionById(collectionId);
		collections = await getContentsByGroupId(collectionId);
	} catch (error) {
		console.error(error);
	}

	if (group === undefined) throw redirect(303, '/admin');

	const form = superValidate(editContentSchema);

	return { group, form, collections, collectionId };
};
