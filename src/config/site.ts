export interface GiscusConfig {
	repo: `${string}/${string}`;
	repoId: string;
	category: string;
	categoryId: string;
}

export interface SiteConfig {
	title: string;
	description: string;
	author: string;
	siteUrl: string;
	avatar: string;
	githubOwner: string;
	githubUrl: string;
	memoIssueNumber: number;
	giscus: GiscusConfig;
}

export const siteConfig: SiteConfig = {
	title: '我的个人博客',
	description: '在这里记录生活、思考与创造。',
	author: '博客作者',
	siteUrl: 'https://creoenmi-p.github.io',
	avatar: '/avatar.svg',
	githubOwner: 'CreoEnMi-p',
	githubUrl: 'https://github.com/CreoEnMi-p',
	memoIssueNumber: 1,
	giscus: {
		repo: 'CreoEnMi-p/CreoEnMi-p.github.io',
		repoId: 'R_kgDOTnUp_g',
		category: 'Comments',
		categoryId: 'DIC_kwDOTnUp_s4DCPs6',
	},
};

export const hasMemoConfig = siteConfig.memoIssueNumber > 0;
export const hasGiscusConfig = Boolean(siteConfig.giscus.repoId && siteConfig.giscus.categoryId);
