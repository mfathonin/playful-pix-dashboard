import type { RequestEvent } from '@sveltejs/kit';
import { REGISTRATION_CODE_SECRET } from '$env/static/private';

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

	const isLogin = Boolean(cookies.get('auth'));

	return isLogin;
};
