import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        author: z.string().optional(),
        publishedAt: z.string().optional(),
        tags: z.array(z.string()).optional(),
        items: z.array(z.object({
          id: z.number(),
          name: z.string(),
          description: z.string()
        })).optional(),
        metadata: z.object({
          author: z.string(),
          date: z.string()
        }).optional()
      })
    })
  }
})
