import { json } from '@sveltejs/kit';

export const PATCH = async ({ params, request }): Promise<Response> => {
	const data = await request.json();
	console.log('patch /contents', data, params);

	return json({ message: 'patch success' });
};
