/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { z } from 'zod'

/**
 * @description Расписание запуска
 */
export const scheduleDateSchema = z
  .object({
    type: z.string().describe('Тип расписания'),
    date_like: z.string().describe('Дата/время в формате cron'),
    is_active: z.boolean().default(true).describe('Активно ли расписание'),
  })
  .describe('Расписание запуска')