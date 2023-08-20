import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const { collectionId } = params;
	return { collectionId };
};
