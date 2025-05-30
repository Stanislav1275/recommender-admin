/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

/**
 * @description Лог выполнения конфигурации
 * @example [object Object]
 */
export type ConfigExecutionLog = {
  _id?: string | null
  created_at?: string | null
  updated_at?: string | null
  /**
   * @description ID конфигурации
   * @type string
   */
  config_id: string
  /**
   * @description Статус выполнения
   * @type string
   */
  status: string
  /**
   * @description Сообщение о результате
   * @type string
   */
  message: string
  /**
   * @description Время выполнения в секундах
   * @type number
   */
  execution_time: number
  /**
   * @description Количество обработанных элементов
   * @type integer
   */
  items_processed: number
  /**
   * @description Текст ошибки, если есть
   */
  error?: string | null
}