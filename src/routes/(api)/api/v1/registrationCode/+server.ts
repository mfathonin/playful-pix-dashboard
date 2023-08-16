import { generateRegistrationCode } from '$lib/server/auth';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	const nowMinute = new Date();
	const hash8Digit = await generateRegistrationCode();

	return json(
		{ registrationCode: hash8Digit },
		{
			// set expiration to exacly the next minute
			headers: {
				'Cache-Control': 'public, max-age=' + (60 - nowMinute.getSeconds())
			}
		}
	);
};
