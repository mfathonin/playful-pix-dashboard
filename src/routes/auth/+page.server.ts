import { login, logout, registerAccount } from '$lib/repositories/auth';
import { fail, redirect } from '@sveltejs/kit';
import { FirebaseError } from 'firebase/app';
import { setError, setMessage, superValidate } from 'sveltekit-superforms/server';
import type { Actions } from './$types';
import { loginSchema, registerSchema } from './constants';

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const form = await superValidate(request, loginSchema);
		const { email, password } = form.data;
		try {
			const user = await login(email, password);
			cookies.set('auth', JSON.stringify(user.user), { path: '/' });
		} catch (error) {
			if (error instanceof FirebaseError) {
				if (error.code.includes('auth/')) {
					return setMessage(form, "Email and password don't match", { status: 401 });
				}
			} else {
				return setMessage(form, '500: Something went wrong', { status: 500 });
			}
		}

		throw redirect(303, '/');
	},
	register: async ({ cookies, request }) => {
		const form = await superValidate(request, registerSchema);
		const { email, password, registerCode } = form.data;
		try {
			const user = await registerAccount(email, password, registerCode);
			cookies.set('auth', JSON.stringify(user.user), { path: '/', secure: true, httpOnly: true });
		} catch (error) {
			if (error instanceof FirebaseError) {
				if (error.code === 'auth/email-already-in-use')
					return setError(form, 'email', 'Email already in use', { status: 409 });
				return setMessage(form, error.code, { status: 401 });
			} else if (error instanceof Error) {
				return setMessage(
					form,
					error.message ? `500: ${error.message}` : '500: Something went wrong',
					{ status: 500 }
				);
			}
			throw fail(500, { message: 'Something went wrong' });
		}

		throw redirect(303, '/');
	},
	logout: async ({ cookies }) => {
		try {
			await logout();

			cookies.set('auth', '', { path: '/' });
		} catch (error) {
			return fail(500, { message: 'Something went wrong' });
		}
		throw redirect(303, '/');
	}
};
