import { getDatabase, ref, set } from 'firebase/database';
import { app } from './firebase';

import type { Platform } from './platform';

type Link = {
	platform: Platform['id'];
	url: string;
};

export const saveLinks = async (userId: string, links: Link[]) => {
	const database = getDatabase(app);
	const userLinksRef = ref(database, `users/${userId}/links`);
	set(userLinksRef, links);
};
