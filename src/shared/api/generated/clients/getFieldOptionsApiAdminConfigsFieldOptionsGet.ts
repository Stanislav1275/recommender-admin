/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type {
  GetFieldOptionsApiAdminConfigsFieldOptionsGetQueryResponse,
  GetFieldOptionsApiAdminConfigsFieldOptionsGet500,
} from '../types/GetFieldOptionsApiAdminConfigsFieldOptionsGet.ts'

function getGetFieldOptionsApiAdminConfigsFieldOptionsGetUrl() {
  return `/api/admin/configs/field-options` as const
}

/**
 * @description Получить опции полей для админ-панели
 * @summary Get Field Options
 * {@link /api/admin/configs/field-options}
 */
export async function getFieldOptionsApiAdminConfigsFieldOptionsGet(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<
    GetFieldOptionsApiAdminConfigsFieldOptionsGetQueryResponse,
    ResponseErrorConfig<GetFieldOptionsApiAdminConfigsFieldOptionsGet500>,
    unknown
  >({ method: 'GET', url: getGetFieldOptionsApiAdminConfigsFieldOptionsGetUrl().toString(), ...requestConfig })
  return res.data
}