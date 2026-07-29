import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { hasMemoConfig, siteConfig } from '../config/site';

export interface Memo {
	id: number;
	body: string;
	html: string;
	createdAt: string;
	url: string;
}

interface GitHubIssueComment {
	id: number;
	body: string | null;
	html_url: string;
	created_at: string;
	user: {
		login: string;
	} | null;
}

function sanitizeMarkdown(markdown: string): string {
	const rendered = marked.parse(markdown, {
		breaks: true,
		gfm: true,
	}) as string;

	return sanitizeHtml(rendered, {
		allowedTags: [
			'p',
			'br',
			'strong',
			'em',
			'del',
			'a',
			'code',
			'pre',
			'blockquote',
			'ul',
			'ol',
			'li',
			'h2',
			'h3',
			'h4',
		],
		allowedAttributes: {
			a: ['href', 'title'],
		},
		allowedSchemes: ['http', 'https', 'mailto'],
		transformTags: {
			a: sanitizeHtml.simpleTransform('a', {
				rel: 'nofollow noopener noreferrer',
				target: '_blank',
			}),
		},
	});
}

export async function getMemos(): Promise<{ memos: Memo[]; error: string | null }> {
	if (!hasMemoConfig) {
		return { memos: [], error: null };
	}

	const endpoint = `https://api.github.com/repos/${siteConfig.giscus.repo}/issues/${siteConfig.memoIssueNumber}/comments`;
	const token = import.meta.env.GITHUB_TOKEN;

	try {
		const response = await fetch(endpoint, {
			headers: {
				Accept: 'application/vnd.github+json',
				'X-GitHub-Api-Version': '2022-11-28',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
		});

		if (!response.ok) {
			throw new Error(`GitHub API returned ${response.status}`);
		}

		const comments = (await response.json()) as GitHubIssueComment[];
		const memos = comments
			.filter((comment) => comment.user?.login.toLowerCase() === siteConfig.githubOwner.toLowerCase())
			.map((comment) => ({
				id: comment.id,
				body: comment.body ?? '',
				html: sanitizeMarkdown(comment.body ?? ''),
				createdAt: comment.created_at,
				url: comment.html_url,
			}))
			.sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt));

		return { memos, error: null };
	} catch (error) {
		console.error('Unable to load GitHub memos:', error);
		return {
			memos: [],
			error: '暂时无法从 GitHub 载入碎碎念，请稍后再试。',
		};
	}
}
