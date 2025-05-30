/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import { errorResponseSchema } from './errorResponseSchema.ts'
import { fieldOptionsSchema } from './fieldOptionsSchema.ts'
import { z } from 'zod'

/**
 * @description Опции полей для админ-панели
 */
export const getFieldOptionsApiAdminConfigsFieldOptionsGet200Schema = z.lazy(() => fieldOptionsSchema).describe('Опции полей для админ-панели')

/**
 * @description Внутренняя ошибка сервера
 */
export const getFieldOptionsApiAdminConfigsFieldOptionsGet500Schema = z.lazy(() => errorResponseSchema).describe('Стандартизированный ответ с ошибкой')

export const getFieldOptionsApiAdminConfigsFieldOptionsGetQueryResponseSchema = z.lazy(() => getFieldOptionsApiAdminConfigsFieldOptionsGet200Schema)