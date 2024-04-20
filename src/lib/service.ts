import { get, getDatabase, ref, set } from 'firebase/database';
import { app } from './firebase';

import type { Platform } from './platform';
import { writable } from 'svelte/store';

export type Link = {
	id: string;
	platform: Platform['id'];
	url: string;
};

export const saveLinks = async (userId: string, links: Link[]) => {
	const database = getDatabase(app);
	const userLinksRef = ref(database, `users/${userId}/links`);
	set(userLinksRef, links);
};

export const loadLinks = async (userId: string) => {
	const database = getDatabase(app);
	const userLinksRef = ref(database, `users/${userId}/links`);
	const snapshot = await get(userLinksRef);
	return snapshot.val();
};

export const linksStore = writable<Link[]>([]);
