import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from '../$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.isLogin) throw redirect(303, '/admin');
};

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		console.log('login data:', data);
		// TODO: implment login
		cookies.set('auth', 'user', { path: '/' }); // this for dummy authenticate state

		throw redirect(303, '/');
	}
};
