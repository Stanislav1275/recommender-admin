/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { z } from 'zod'

export const validationErrorSchema = z.object({
  loc: z.array(z.union([z.number().int(), z.string()])),
  msg: z.string(),
  type: z.string(),
})