import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from '../../$types';
import { registerSchema } from '../../auth/constants';

export const load: PageServerLoad = async () => {
	const form = await superValidate(registerSchema);

	return { form };
};
