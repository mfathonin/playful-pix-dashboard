import { getGroups } from '$lib/repositories/groups';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { collectionId } = params;
	const groups = await getGroups();
	return { groups, collectionId };
}) satisfies LayoutServerLoad;
