/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { TrainApiTrainPostMutationResponse } from '../types/TrainApiTrainPost.ts'

function getTrainApiTrainPostUrl() {
  return `/api/train` as const
}

/**
 * @summary Train
 * {@link /api/train}
 */
export async function trainApiTrainPost(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<TrainApiTrainPostMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'POST',
    url: getTrainApiTrainPostUrl().toString(),
    ...requestConfig,
  })
  return res.data
}