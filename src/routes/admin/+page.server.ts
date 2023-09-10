import { crudCollectionSchema } from '$lib/models/contents';
import {
	createCollection,
	getCollectionById,
	updateCollectionById
} from '$lib/repositories/collections';
import { error, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

export const actions: Actions = {
	collections: async ({ request }) => {
		const form = await superValidate(request, crudCollectionSchema);

		console.log(form.data);
		if (!form.data.id) {
			// create
			const { name, attributes } = form.data;
			try {
				await createCollection({ name, attributes });
			} catch (error) {
				console.error(error);
				throw error;
			}
			return message(form, 'Collection created');
		} else {
			// update
			try {
				const collection = await getCollectionById(form.data.id);
				if (collection === undefined) throw error(404, 'Collection not found');

				const { name, attributes } = form.data;
				await updateCollectionById(form.data.id, { ...collection, name, attributes });
			} catch (err) {
				console.error(err);
				throw err;
			}
			return message(form, 'Collection updated');
		}
	}
};
