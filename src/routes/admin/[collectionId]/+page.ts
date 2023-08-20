import { getGroupById } from '$lib/repositories/groups';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { editContentSchema, getContentsByGroupId } from '$lib/repositories/contents';
import { superValidate } from 'sveltekit-superforms/server';

export const load: PageLoad = async ({ params }) => {
	const { collectionId } = params;
	const group = await getGroupById(collectionId);
	const collections = await getContentsByGroupId(collectionId);
	if (group === undefined) throw redirect(303, '/admin');

	const form = superValidate(editContentSchema);

	return { group, form, collections, collectionId };
};
