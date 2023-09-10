import { authenticateUser } from '$lib/server/auth';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { isLogin } = authenticateUser(event);
	const pathname = event.url.pathname;

	event.locals.isLogin = isLogin;

	if (pathname.startsWith('/admin') && !isLogin) {
		throw redirect(303, '/login');
	}

	const user = event.cookies.get('auth');
	if (user) event.locals.user = JSON.parse(user);

	const response = await resolve(event);

	return response;
};
