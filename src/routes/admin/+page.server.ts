import { crudCollectionSchema } from '$lib/models/contents';
import {
	createCollection,
	deleteCollectionById,
	getCollectionById,
	updateCollectionById
} from '$lib/repositories/collections';
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
	}
};
