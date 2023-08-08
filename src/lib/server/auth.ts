import type { RequestEvent } from '@sveltejs/kit';

export const authenticateUser = (event: RequestEvent) => {
	const { cookies } = event;

	const isLogin = Boolean(cookies.get('auth'));

	return isLogin;
};
