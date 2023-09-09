import { redirect } from '@sveltejs/kit';
import type { Actions } from '../$types';

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		console.log('login data:', data);
		// TODO: implment login
		cookies.set('auth', 'user', { path: '/' }); // this for dummy authenticate state

		throw redirect(303, '/');
	},
	register: async ({ cookies, request }) => {
		const data = await request.formData();
		console.log('register data:', data);

		// TODO: implement register
		cookies.set('auth', 'user', { path: '/' });

		throw redirect(303, '/');
	}
};
