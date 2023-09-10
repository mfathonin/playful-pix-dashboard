import type { User } from 'firebase/auth';
import { FirebaseAuth } from '$lib/services/firebase/firebase';
import type { RequestEvent } from '@sveltejs/kit';

export const authenticateUser = (event: RequestEvent) => {
	const { cookies } = event;

	const isLogin = cookies.get('auth') !== '' && cookies.get('auth') !== undefined;
	const cookiesAuth = cookies.get('auth');
	let user: User | undefined = undefined;
	if (isLogin && cookiesAuth) {
		user = JSON.parse(cookiesAuth) as User;
		event.locals.user = FirebaseAuth.currentUser || user;
	}

	return { isLogin, user };
};
