import type { Link } from '$/lib/service';
import type { OrderableLink } from '../+page.svelte';

export const convertToLinks = (orderableLinks: OrderableLink[]): Link[] => {
	return orderableLinks.map((orderableLink) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { originalIndex, ...link } = orderableLink;
		return link;
	});
};
