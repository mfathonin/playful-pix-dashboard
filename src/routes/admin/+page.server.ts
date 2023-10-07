import { env } from '$env/dynamic/private';
import { crudCollectionSchema } from '$lib/models/collections';
import { crudContentSchema } from '$lib/models/contents';
import {
	createCollection,
	deleteCollectionById,
	getCollectionById,
	updateCollectionById
} from '$lib/repositories/collections';
import {
	createContent,
	deleteContentById,
	getContentsById,
	updateContentById
} from '$lib/repositories/contents';
import { collectionsStore } from '$lib/stores/collections';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

export const actions: Actions = {
	collections: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, crudCollectionSchema);

		if (!form.data.id) {
			// create
			const { name, attributes } = form.data;
			try {
				const newCollection = await createCollection({ name, attributes });
				collectionsStore.update((curr) => ({
					collections: [...curr.collections, newCollection],
					expiredAt: undefined
				}));
			} catch (error) {
				console.error('error on createCollections', error);
				return fail(500, { form });
			}
			return message(form, 'Collection created');
		} else {
			// update
			const collection = await getCollectionById(form.data.id);
			if (collection === undefined) throw error(404, 'Collection not found');

			if (formData.has('delete')) {
				try {
					await deleteCollectionById(form.data.id);
					collectionsStore.update((curr) => ({
						collections: curr.collections.filter((c) => c.id !== form.data.id),
						expiredAt: undefined
					}));
				} catch (err) {
					console.error('error on delete collection', err);
					return fail(500, { form });
				}
				throw redirect(301, '/');
			} else {
				try {
					const { name, attributes } = form.data;
					const updatedCollection = await updateCollectionById(form.data.id, {
						...collection,
						name,
						attributes
					});
					collectionsStore.update((curr) => ({
						collections: curr.collections.map((c) =>
							c.id === updatedCollection.id ? updatedCollection : c
						),
						expiredAt: undefined
					}));
					return message(form, 'Collection updated');
				} catch (err) {
					console.error('error on update collection', err);
					return fail(500, { form });
				}
			}
		}
	},
	contents: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, crudContentSchema);

		const { id, collectionId, title, targetUrl, generatedUrl } = form.data;
		if (!id) {
			// Create ones
			const generatedUrl = generateUrl(title);
			try {
				await createContent({
					collectionId,
					title,
					link: {
						targetUrl,
						url: generatedUrl.toLocaleLowerCase(),
						fallbackUrl: env.FALLBACK_URL || 'http://localhost:5173/download-apps'
					}
				});

				return message(form, 'Content created');
			} catch (error) {
				console.error('error on createContent', error);
				return fail(500, { form });
			}
		} else {
			if (formData.has('delete')) {
				// Delete ones
				try {
					await deleteContentById(id);
				} catch (err) {
					console.error('error on deleteContent', err);
					return fail(500, { form });
				}
				throw redirect(301, '/');
			} else {
				// Update ones
				const content = await getContentsById(id);
				if (content === undefined) throw error(404, 'Content not found');
				try {
					await updateContentById(id, {
						title,
						link: {
							targetUrl,
							url:
								generatedUrl && content.link.url !== generatedUrl ? generatedUrl : content.link.url,
							fallbackUrl: env.FALLBACK_URL || 'localhost:5173/download-apps'
						},
						collectionId
					});
					return message(form, 'Content updated');
				} catch (error) {
					console.error('error on updateContent', error);
					return fail(500, { form });
				}
			}
		}
	}
};

const generateUrl = (title: string) => {
	const today = new Date();
	const dateStr = today.toISOString().replace(/[-:T]/g, '').slice(4, 12);
	const len = title.length;
	const words = title.toLocaleLowerCase().replace('-', ' ').split(' ');
	if (len <= 15) return words.join('-').concat('-', dateStr);

	const url =
		words.length > 2
			? (words[0][0] + '-' + words[1][0] + '-' + words.slice(2).join('-')).slice(0, 20)
			: words[0].slice(0, 20);

	return url[url.length - 1] === '-'
		? url.slice(0, url.length - 1).concat('-', dateStr)
		: url.concat('-', dateStr);
};
