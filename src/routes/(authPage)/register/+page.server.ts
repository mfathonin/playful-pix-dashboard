import { superValidate } from 'sveltekit-superforms/server';
import { registerSchema } from '../../auth/constants';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const form = await superValidate(registerSchema);

	return { form };
};
