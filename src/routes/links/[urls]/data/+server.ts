import { env } from '$env/dynamic/public';
import type { ContentDigital } from '$lib/models/contents.js';
import { getCollectionById } from '$lib/repositories/collections.js';
import { getContentsByUrl } from '$lib/repositories/contents.js';
import { error, json } from '@sveltejs/kit';

export const GET = async ({ params, url }) => {
	const isAllowed = url.searchParams.get('app') === env.PUBLIC_APP_ID;

	const { urls: link } = params ?? {};
	if (!link) throw error(404);
	let contents: ContentDigital[] | undefined;
	try {
		contents = await getContentsByUrl(link);
		if (!contents || contents.length === 0) {
			throw error(404);
		}
	} catch (err) {
		throw error(404);
	}
	if (!isAllowed) throw error(403, { message: "You're not allowed to access this resource" });

	const promises = contents.map(async (content) => await getCollectionById(content.collectionId));
	const collections = await Promise.all(promises);

	const data = contents.map((content) => ({
		...content,
		collection: collections.find((collection) => collection?.id === content.collectionId)
	}));

	return json({ contents: data.filter((cn) => cn.collection) });
};
