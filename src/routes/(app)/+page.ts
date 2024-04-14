import { getUser } from '$/auth';
import { base } from '$app/paths';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	const user = await getUser();
	redirect(302, user ? `${base}/links` : `${base}/login`);
};
