import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	register: async ({ cookies, request }) => {
		const data = await request.formData();
		console.log('register data:', data);

		// TODO: implement register
		cookies.set('auth', 'user', { path: '/' });

		throw redirect(303, '/');
	}
};
