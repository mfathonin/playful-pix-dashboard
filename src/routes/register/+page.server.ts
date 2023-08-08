import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	register: async ({ cookies, request }) => {
		const data = await request.formData();
		console.log('register data:', data);
		// TODO: implement register
		cookies.set('auth', 'user', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});

		throw redirect(303, '/');
	}
};
