import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export async function getVisiblePosts(): Promise<BlogPost[]> {
	const posts = await getCollection('blog', ({ data }) => (import.meta.env.PROD ? !data.draft : true));
	return posts.sort((left, right) => right.data.pubDate.valueOf() - left.data.pubDate.valueOf());
}

export function getPostSummary(post: BlogPost): string {
	return post.data.summary || post.data.description || '阅读全文';
}

export function getAllTags(posts: BlogPost[]): Map<string, number> {
	const tags = new Map<string, number>();
	for (const post of posts) {
		for (const tag of post.data.tags) {
			tags.set(tag, (tags.get(tag) ?? 0) + 1);
		}
	}
	return new Map([...tags.entries()].sort(([left], [right]) => left.localeCompare(right, 'zh-CN')));
}

export function getPostHref(post: BlogPost): string {
	return `/blog/${encodeURIComponent(post.id)}.html`;
}
