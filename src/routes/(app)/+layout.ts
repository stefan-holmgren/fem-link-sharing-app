import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import { getUser } from '../../auth';

export const ssr = false;

export const load = async () => {
	const user = await getUser();

	if (!user) {
		redirect(302, `${base}/login`);
	}

	return { user };
};
