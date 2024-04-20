import IconCodepen from '$/icons/IconCodepen.svelte';
import IconCodewars from '$/icons/IconCodewars.svelte';
import IconDevto from '$/icons/IconDevto.svelte';
import IconFacebook from '$/icons/IconFacebook.svelte';
import IconFreecodecamp from '$/icons/IconFreecodecamp.svelte';
import IconFrontendMentor from '$/icons/IconFrontendMentor.svelte';
import IconGithub from '$/icons/IconGithub.svelte';
import IconGitlab from '$/icons/IconGitlab.svelte';
import IconHashnode from '$/icons/IconHashnode.svelte';
import IconLinkedin from '$/icons/IconLinkedin.svelte';
import IconStackoverflow from '$/icons/IconStackoverflow.svelte';
import IconTwitch from '$/icons/IconTwitch.svelte';
import IconX from '$/icons/IconX.svelte';
import IconYoutube from '$/icons/IconYoutube.svelte';
import type { ComponentType } from 'svelte';

type PlatformId =
	| 'github'
	| 'frontendmentor'
	| 'x'
	| 'linkedin'
	| 'youtube'
	| 'facebook'
	| 'twitch'
	| 'devto'
	| 'codewars'
	| 'codepen'
	| 'freecodecamp'
	| 'gitlab'
	| 'hashnode'
	| 'stackoverflow';

export type Platform = {
	id: PlatformId;
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
	},
	{
		id: 'linkedin',
		urlPattern: 'https://www.linkedin.com/in/<username>',
		name: 'LinkedIn',
		icon: IconLinkedin
	},
	{
		id: 'youtube',
		urlPattern: 'https://www.youtube.com/@<username>',
		name: 'YouTube',
		icon: IconYoutube
	},
	{
		id: 'facebook',
		urlPattern: 'https://www.facebook.com/<username>',
		name: 'Facebook',
		icon: IconFacebook
	},
	{
		id: 'twitch',
		urlPattern: 'https://www.twitch.tv/<username>',
		name: 'Twitch',
		icon: IconTwitch
	},
	{
		id: 'devto',
		urlPattern: 'https://dev.to/<username>',
		name: 'Dev.to',
		icon: IconDevto
	},
	{
		id: 'codewars',
		urlPattern: 'https://www.codewars.com/users/<username>',
		name: 'Codewars',
		icon: IconCodewars
	},
	{
		id: 'codepen',
		urlPattern: 'https://codepen.io/<username>',
		name: 'CodePen',
		icon: IconCodepen
	},
	{
		id: 'freecodecamp',
		urlPattern: 'https://www.freecodecamp.org/<username>',
		name: 'freeCodeCamp',
		icon: IconFreecodecamp
	},
	{
		id: 'gitlab',
		urlPattern: 'https://gitlab.com/<username>',
		name: 'GitLab',
		icon: IconGitlab
	},
	{
		id: 'hashnode',
		urlPattern: 'https://hashnode.com/@<username>',
		name: 'Hashnode',
		icon: IconHashnode
	},
	{
		id: 'stackoverflow',
		urlPattern: 'https://stackoverflow.com/users/<username>',
		name: 'Stack Overflow',
		icon: IconStackoverflow
	}
] as const;

export const validatePlatformUrl = (platform: Platform, url: string) => {
	const regex = url.replace(/\./g, '\\.').replace(/\//g, '\\/').replace('<username>', '(.+)');
	return new RegExp(`^${regex}$`).test(url);
};
