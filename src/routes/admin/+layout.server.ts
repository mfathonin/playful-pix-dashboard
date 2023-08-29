import { getGroups } from '$lib/repositories/groups';
import { superValidate } from 'sveltekit-superforms/server';
import type { LayoutServerLoad } from './$types';
import { createCollectionSchema } from '$lib/models/contents';

export const load = (async ({ params }) => {
	const { collectionId } = params;
	const groups = await getGroups();
	const formCreateCollection = superValidate(createCollectionSchema);
	return { groups, collectionId, formCreateCollection };
}) satisfies LayoutServerLoad;
