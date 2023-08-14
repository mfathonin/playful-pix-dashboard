import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../../$types';
import { superValidate } from 'sveltekit-superforms/server';
import { loginSchema } from '../../auth/constants';

export const load: PageServerLoad = async (events) => {
	const { locals } = events;
	if (locals.isLogin) throw redirect(303, '/admin');
	const form = await superValidate(loginSchema);

	return { form };
};
