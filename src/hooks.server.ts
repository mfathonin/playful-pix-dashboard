import { authenticateUser } from '$lib/server/auth';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { isLogin, user } = authenticateUser(event);
	const pathname = event.url.pathname;

	event.locals.isLogin = isLogin;
	event.locals.user = user;

	if (pathname.startsWith('/admin') && !isLogin) {
		throw redirect(303, '/login');
	}

	const response = await resolve(event);

	return response;
};
