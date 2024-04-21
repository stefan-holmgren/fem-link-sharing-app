import type { OrderableLink } from '../+page.svelte';

export const swapOrderableLinks = (
	links: OrderableLink[],
	link1: OrderableLink,
	link2: OrderableLink
) => {
	const index1 = links.indexOf(link1);
	const index2 = links.indexOf(link2);
	if (index1 === -1 || index2 === -1) return;
	[links[index1], links[index2]] = [links[index2], links[index1]];
};
