import { FirebaseAuth } from '$lib/services/firebase/firebase';
import type { RequestEvent } from '@sveltejs/kit';

export const authenticateUser = (event: RequestEvent) => {
	const { cookies } = event;
	// check using firebase auth
	const isLoginFirebase = FirebaseAuth.currentUser !== null;

	const isLogin =
		cookies.get('auth') !== undefined && cookies.get('auth') !== '' && isLoginFirebase;

	return { isLogin };
};
