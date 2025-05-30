/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import type {
  GetConfigApiAdminConfigsConfigIdGetQueryResponse,
  GetConfigApiAdminConfigsConfigIdGetPathParams,
  GetConfigApiAdminConfigsConfigIdGet404,
  GetConfigApiAdminConfigsConfigIdGet422,
  GetConfigApiAdminConfigsConfigIdGet500,
} from '../types/GetConfigApiAdminConfigsConfigIdGet.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { getConfigApiAdminConfigsConfigIdGet } from '../clients/getConfigApiAdminConfigsConfigIdGet.ts'

export const getConfigApiAdminConfigsConfigIdGetQueryKey = (config_id: GetConfigApiAdminConfigsConfigIdGetPathParams['config_id']) =>
  [{ url: '/api/admin/configs/:config_id', params: { config_id: config_id } }] as const

export type GetConfigApiAdminConfigsConfigIdGetQueryKey = ReturnType<typeof getConfigApiAdminConfigsConfigIdGetQueryKey>

export function getConfigApiAdminConfigsConfigIdGetQueryOptions(
  config_id: GetConfigApiAdminConfigsConfigIdGetPathParams['config_id'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getConfigApiAdminConfigsConfigIdGetQueryKey(config_id)
  return queryOptions<
    GetConfigApiAdminConfigsConfigIdGetQueryResponse,
    ResponseErrorConfig<GetConfigApiAdminConfigsConfigIdGet404 | GetConfigApiAdminConfigsConfigIdGet422 | GetConfigApiAdminConfigsConfigIdGet500>,
    GetConfigApiAdminConfigsConfigIdGetQueryResponse,
    typeof queryKey
  >({
    enabled: !!config_id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getConfigApiAdminConfigsConfigIdGet(config_id, config)
    },
  })
}

/**
 * @description Получить конфигурацию по ID
 * @summary Get Config
 * {@link /api/admin/configs/:config_id}
 */
export function useGetConfigApiAdminConfigsConfigIdGet<
  TData = GetConfigApiAdminConfigsConfigIdGetQueryResponse,
  TQueryData = GetConfigApiAdminConfigsConfigIdGetQueryResponse,
  TQueryKey extends QueryKey = GetConfigApiAdminConfigsConfigIdGetQueryKey,
>(
  config_id: GetConfigApiAdminConfigsConfigIdGetPathParams['config_id'],
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetConfigApiAdminConfigsConfigIdGetQueryResponse,
        ResponseErrorConfig<GetConfigApiAdminConfigsConfigIdGet404 | GetConfigApiAdminConfigsConfigIdGet422 | GetConfigApiAdminConfigsConfigIdGet500>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getConfigApiAdminConfigsConfigIdGetQueryKey(config_id)

  const query = useQuery(
    {
      ...(getConfigApiAdminConfigsConfigIdGetQueryOptions(config_id, config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient,
  ) as UseQueryResult<
    TData,
    ResponseErrorConfig<GetConfigApiAdminConfigsConfigIdGet404 | GetConfigApiAdminConfigsConfigIdGet422 | GetConfigApiAdminConfigsConfigIdGet500>
  > & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}