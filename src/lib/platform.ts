import IconFrontendMentor from '$/icons/IconFrontendMentor.svelte';
import IconGithub from '$/icons/IconGithub.svelte';
import IconX from '$/icons/IconX.svelte';
import type { ComponentType } from 'svelte';

type Platform = {
	id: string;
	urlPattern: string;
	name: string;
	icon: ComponentType;
};

export const platforms: Platform[] = [
	{
		id: 'github',
		urlPattern: 'https://github.com/<username>',
		name: 'GitHub',
		icon: IconGithub
	},
	{
		id: 'frontendmentor',
		urlPattern: 'https://www.frontendmentor.io/profile/<username>',
		name: 'Frontend Mentor',
		icon: IconFrontendMentor
	},
	{
		id: 'x',
		urlPattern: 'https://twitter.com/<username>',
		name: 'X',
		icon: IconX
	}
];

export const validatePlatformUrl = (platform: Platform, url: string) => {
	const regex = url.replace(/\./g, '\\.').replace(/\//g, '\\/').replace('<username>', '(.+)');
	return new RegExp(`^${regex}$`).test(url);
};
