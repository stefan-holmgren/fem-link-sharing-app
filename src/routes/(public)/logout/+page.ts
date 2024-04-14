import { signOut } from '$/auth';
import { base } from '$app/paths';
import { redirect } from '@sveltejs/kit';

export const ssr = false;

export const load = async () => {
	await signOut();
	redirect(302, `${base}/login`);
};
