import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_API_TOKEN: z.string().min(1),
})

export const env = envSchema.parse({
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_API_TOKEN: import.meta.env.VITE_API_TOKEN,
})

export type Env = z.infer<typeof envSchema> 