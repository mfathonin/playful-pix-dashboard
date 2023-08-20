import { getGroupById } from '$lib/repositories/groups';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const { collectionId } = params;
	const group = await getGroupById(collectionId);

	if (group === undefined) throw redirect(303, '/admin');

	return { group, collectionId };
};
