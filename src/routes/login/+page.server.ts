import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		console.log('login data:', data);
		// TODO: implment login
		cookies.set('auth', 'user', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7 // 1 week
		}); // this for dummy authenticate state

		throw redirect(303, '/');
	}
};
