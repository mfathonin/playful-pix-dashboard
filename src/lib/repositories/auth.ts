import { FirebaseAuth } from '$lib/services/firebase/firebase';
import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { generateRegistrationCode } from '$lib/utils/helpers';

export const login = async (email: string, password: string) => {
	try {
		return await signInWithEmailAndPassword(FirebaseAuth, email, password);
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
		const newUser = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
		sendEmailVerification(newUser.user);
		return newUser;
	} catch (error: unknown) {
		console.error('error', error instanceof FirebaseError, error);
		throw error;
	}
};

export const logout = async () => {
	try {
		await signOut(FirebaseAuth);
	} catch (error: unknown) {
		console.error('error', error instanceof FirebaseError, error);
		throw error;
	}
};

export const resetPassword = async (email: string) => {
	try {
		await sendPasswordResetEmail(FirebaseAuth, email);
	} catch (error: unknown) {
		console.error('error', error instanceof FirebaseError, error);
		throw error;
	}
};
