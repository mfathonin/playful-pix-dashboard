import { editContentSchema } from '$lib/models/contents';
import { getContentsByGroupId } from '$lib/repositories/contents';
import { getGroupById } from '$lib/repositories/groups';
import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const { collectionId } = params;
	const group = await getGroupById(collectionId);
	const collections = await getContentsByGroupId(collectionId);
	if (group === undefined) throw redirect(303, '/admin');

	const form = superValidate(editContentSchema);

	return { group, form, collections, collectionId };
};
