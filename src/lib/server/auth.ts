import type { RequestEvent } from '@sveltejs/kit';
import { REGISTRATION_CODE_SECRET } from '$env/static/private';
import { auth } from '$lib/firebase/firebase.client';
import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	type User
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

export const generateRegistrationCode = async () => {
	const nowMinute = new Date();
	const todayInDDMMYYHHMM = nowMinute.toISOString().slice(0, 16).replace(/[-T:]/g, '');

	const hash = await crypto.subtle.digest(
		'SHA-256',
		new TextEncoder().encode(REGISTRATION_CODE_SECRET + todayInDDMMYYHHMM)
	);
	const hash8Digit = Array.from(new Uint8Array(hash))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('')
		.slice(0, 8);

	return hash8Digit.toUpperCase();
};

export const authenticateUser = (event: RequestEvent) => {
	const { cookies } = event;

	const isLogin = cookies.get('auth') !== '';
	const cookiesAuth = cookies.get('auth');
	let user: User | undefined = undefined;
	if (isLogin && cookiesAuth) {
		user = JSON.parse(cookiesAuth) as User;
		event.locals.user = auth.currentUser || user;
	}

	return { isLogin, user };
};

export const login = async (email: string, password: string) => {
	try {
		return await signInWithEmailAndPassword(auth, email, password);
	} catch (error: unknown) {
		console.error('error', error instanceof FirebaseError, error);
		throw error;
	}
};

export const registerAccount = async (email: string, password: string, code: string) => {
	try {
		if (code !== (await generateRegistrationCode())) {
			throw new Error('Invalid registration code');
		}
		return await createUserWithEmailAndPassword(auth, email, password);
	} catch (error: unknown) {
		console.error('error', error instanceof FirebaseError, error);
		throw error;
	}
};

export const logout = async () => {
	try {
		await signOut(auth);
	} catch (error: unknown) {
		console.error('error', error instanceof FirebaseError, error);
		throw error;
	}
};

export const resetPassword = async (email: string) => {
	try {
		await sendPasswordResetEmail(auth, email);
	} catch (error: unknown) {
		console.error('error', error instanceof FirebaseError, error);
		throw error;
	}
};
