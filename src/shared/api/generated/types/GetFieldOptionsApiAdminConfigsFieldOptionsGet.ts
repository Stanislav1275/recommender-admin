/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { ErrorResponse } from './ErrorResponse.ts'
import type { FieldOptions } from './FieldOptions.ts'

/**
 * @description Опции полей для админ-панели
 * @example [object Object]
 */
export type GetFieldOptionsApiAdminConfigsFieldOptionsGet200 = FieldOptions

/**
 * @description Внутренняя ошибка сервера
 * @example [object Object]
 */
export type GetFieldOptionsApiAdminConfigsFieldOptionsGet500 = ErrorResponse

export type GetFieldOptionsApiAdminConfigsFieldOptionsGetQueryResponse = GetFieldOptionsApiAdminConfigsFieldOptionsGet200

export type GetFieldOptionsApiAdminConfigsFieldOptionsGetQuery = {
  Response: GetFieldOptionsApiAdminConfigsFieldOptionsGet200
  Errors: GetFieldOptionsApiAdminConfigsFieldOptionsGet500
}