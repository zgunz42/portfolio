/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { InquiryGameServer } from '@iak-id/iak-api-server-js'
import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { getGameServer } from 'api'

function useGameServer(gameCode: number): UseQueryResult<InquiryGameServer[]> {
	const result = useQuery(
		['gameServer', gameCode],
		async ({ queryKey }) => getGameServer(queryKey[1] as number),
		{
			enabled: false,
			initialData: []
		}
	)

	if (gameCode !== 0 && !result.isFetched) {
		void result.refetch()
	}

	return result
}

export default useGameServer
