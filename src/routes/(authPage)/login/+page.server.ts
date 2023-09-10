import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { loginSchema } from '../../auth/constants';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (events) => {
	const { locals } = events;
	if (locals.isLogin) throw redirect(303, '/admin');
	const form = await superValidate(loginSchema);

	return { form };
};
