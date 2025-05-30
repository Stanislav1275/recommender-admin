/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { fieldFilterSchema } from './fieldFilterSchema.ts'
import { scheduleDateSchema } from './scheduleDateSchema.ts'
import { z } from 'zod'

/**
 * @description Конфигурация рекомендаций
 */
export const recommendationConfigSchema = z
  .object({
    id: z.union([z.string(), z.null()]).describe('ID конфигурации').optional(),
    created_at: z.union([z.string().datetime(), z.null()]).optional(),
    updated_at: z.union([z.string().datetime(), z.null()]).optional(),
    name: z.string().describe('Название конфигурации'),
    description: z.string().describe('Описание конфигурации'),
    is_active: z.boolean().default(true).describe('Активна ли конфигурация'),
    title_field_filters: z.array(z.lazy(() => fieldFilterSchema).describe('Фильтр по полю')).describe('Фильтры по полям тайтлов'),
    schedules_dates: z.array(z.lazy(() => scheduleDateSchema).describe('Расписание запуска')).describe('Расписания запуска'),
  })
  .describe('Конфигурация рекомендаций')