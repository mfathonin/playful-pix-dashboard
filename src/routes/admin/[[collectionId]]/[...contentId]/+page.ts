import { getGroups } from '$lib/repositories/groups';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const { collectionId, contentId } = params;
	const groups = await getGroups();
	const activeGroup = groups.find((group) => group.id === collectionId);
	return { groups, activeGroup, collectionId, contentId };
};
