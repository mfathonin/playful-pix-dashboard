import type { RequestEvent } from '@sveltejs/kit';

export const authenticateUser = (event: RequestEvent) => {
	const { cookies } = event;

	const isLogin = cookies.get('auth') !== undefined && cookies.get('auth') !== '';

	return { isLogin };
};
