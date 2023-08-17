import { getGroups } from '$lib/repositories/groups';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const groups = await getGroups();
	return { groups };
};
