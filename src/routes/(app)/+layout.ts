import { getUser } from '$/lib/auth';
import { base } from '$app/paths';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	const user = await getUser();
	if (!user) {
		redirect(302, `${base}/login`);
	}
	return { user };
};
