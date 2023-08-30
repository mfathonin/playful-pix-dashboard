import { actionResult, superValidate } from 'sveltekit-superforms/server';
import type { RequestEvent } from './$types';
import { createCollectionSchema } from '$lib/models/contents';

export const POST = async ({ request }: RequestEvent) => {
	const data = await request.json();
	const form = await superValidate(data, createCollectionSchema);
	return actionResult('success', { form });
};
