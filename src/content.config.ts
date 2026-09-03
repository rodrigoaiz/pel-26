import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const lessons = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/lessons' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    unit: z.string().optional(),
    unitTitle: z.string().optional(),
    learning: z.string().optional(),
    learningTitle: z.string().optional(),
    firstSectionId: z.string().optional(),
    status: z.enum(['current', 'next', 'locked']).default('next'),
    kind: z.enum(['dialogue', 'practice', 'production', 'review']).default('practice')
  })
});

export const collections = { lessons };
