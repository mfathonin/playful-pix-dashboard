import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../../$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.isLogin) throw redirect(303, '/admin');
};
