import { FirebaseAuth } from '$lib/services/firebase/firebase';
import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth';
import { generateRegistrationCode } from '$lib/utils/helpers';

export const login = async (email: string, password: string) => {
	return await signInWithEmailAndPassword(FirebaseAuth, email, password);
};

export const registerAccount = async (email: string, password: string, code: string) => {
	if (code !== (await generateRegistrationCode())) {
		throw new Error('Invalid registration code');
	}
	const newUser = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
	sendEmailVerification(newUser.user);
	return newUser;
};

export const logout = async () => {
	await signOut(FirebaseAuth);
};

export const resetPassword = async (email: string) => {
	await sendPasswordResetEmail(FirebaseAuth, email);
};
