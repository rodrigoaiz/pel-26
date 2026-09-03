import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const lessons = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/lessons' }),
  schema: z.object({
    course: z.string(),
    title: z.string(),
    subtitle: z.string(),
    route: z.string().optional(),
    unit: z.object({
      id: z.string(),
      title: z.string(),
      order: z.number().int().positive()
    }),
    learning: z.object({
      id: z.string(),
      title: z.string(),
      order: z.number().int().positive()
    }),
    screenOrder: z.number().int().positive().default(1),
    firstSectionId: z.string().optional(),
    heroPhrase: z.string().optional(),
    heroTranslation: z.string().optional(),
    status: z.enum(['current', 'next', 'locked']).default('next'),
    kind: z.enum(['dialogue', 'practice', 'production', 'review']).default('practice')
  })
});

export const collections = { lessons };
