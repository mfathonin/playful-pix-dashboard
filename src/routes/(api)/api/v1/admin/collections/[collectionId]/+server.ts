import { actionResult, superValidate } from 'sveltekit-superforms/server';
import type { RequestEvent } from '../$types';
import { createCollectionSchema } from '$lib/models/contents';

export const PATCH = async (event: RequestEvent): Promise<Response> => {
	const data = await event.request.json();
	const form = await superValidate(data, createCollectionSchema);
	return actionResult('success', { form });
};
