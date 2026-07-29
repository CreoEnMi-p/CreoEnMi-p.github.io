import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({
		base: './src/content/blog',
		pattern: '**/*.{md,mdx}',
		generateId: ({ entry, data }) => String(data.slug || entry.replace(/\.(md|mdx)$/i, '')),
	}),
	schema: ({ image }) =>
		z.object({
			slug: z.coerce.string().optional(),
			title: z.string(),
			description: z.string().optional(),
			summary: z.string().optional(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			tags: z.array(z.string()).optional().default([]),
			draft: z.boolean().optional().default(false),
		}),
});

export const collections = { blog };
