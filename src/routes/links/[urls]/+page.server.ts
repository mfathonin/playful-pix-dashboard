import { env } from '$env/dynamic/public';
import type { ContentDigital } from '$lib/models/contents.js';
import { getCollectionById } from '$lib/repositories/collections';
import { getContentsByUrl } from '$lib/repositories/contents';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ params, url }) => {
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

	const promises = contents.map(async (content) => await getCollectionById(content.collectionId));
	const collections = await Promise.all(promises);

	const data = contents.map((content) => ({
		...content,
		collection: collections.find((collection) => collection?.id === content.collectionId)
	}));

	if (!isAllowed) throw error(403, { message: JSON.stringify(data.filter((cn) => cn.collection)) });

	const newUrl = new URL(url.pathname + '/data', url.origin);
	if (env.PUBLIC_APP_ID) newUrl.searchParams.set('app', env.PUBLIC_APP_ID);

	throw redirect(303, newUrl.href);
};
