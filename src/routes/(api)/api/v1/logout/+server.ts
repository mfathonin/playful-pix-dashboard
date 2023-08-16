import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies, locals }) => {
	cookies.delete('auth', { path: '/' });
	locals.isLogin = false;

	throw redirect(303, '/login');
};
