import { redirect } from '@sveltejs/kit';
import type { Actions } from '../$types';
import { login, registerAccount } from '$lib/server/auth';

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();

		const { email, password } = Object.fromEntries(data.entries());
		const user = await login(email.toString(), password.toString());
		cookies.set('auth', JSON.stringify(user), { path: '/' });

		throw redirect(303, '/');
	},
	register: async ({ cookies, request }) => {
		const data = await request.formData();

		const { email, password, registerCode } = Object.fromEntries(data.entries());
		const user = await registerAccount(
			email.toString(),
			password.toString(),
			registerCode.toString()
		);
		cookies.set('auth', JSON.stringify(user), { path: '/' });

		throw redirect(303, '/');
	},
	logout: async ({ cookies }) => {
		cookies.set('auth', '', { path: '/' });
		throw redirect(303, '/');
	}
};
