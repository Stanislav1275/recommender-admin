/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { FieldMetadata } from './FieldMetadata.ts'
import type { ScheduleType } from './ScheduleType.ts'

/**
 * @description Опции полей для админ-панели
 * @example [object Object]
 */
export type FieldOptions = {
  /**
   * @description Метаданные полей для фильтрации
   * @type array
   */
  title_fields: FieldMetadata[]
  /**
   * @description Доступные типы расписаний
   * @type array
   */
  schedule_types: ScheduleType[]
}