import type { Link } from '$/lib/service';
import type { OrderableLink } from '../+page.svelte';

export const convertToOrderableLinks = (links: Link[]): OrderableLink[] => {
	return links.map((link, i) => ({
		...link,
		originalIndex: i
	}));
};
