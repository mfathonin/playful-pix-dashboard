import { createContentSchema } from '$lib/models/contents.js';
import { actionResult, superValidate } from 'sveltekit-superforms/server';
import type { RequestEvent } from './$types';

export const POST = async (event: RequestEvent): Promise<Response> => {
	const form = await superValidate(await event.request.formData(), createContentSchema);

	console.log('post /contents', form.data);
	return actionResult('success', form.data);
};
