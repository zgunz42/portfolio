import type { PostpaidInqueryData } from '@iak-id/iak-api-server-js'
import type { UseMutationResult } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { inqueryOrder } from 'api'
import type { InqueryInOrder } from 'types'

function useSendInquery(): UseMutationResult<
	PostpaidInqueryData,
	unknown,
	InqueryInOrder
> {
	const result = useMutation<PostpaidInqueryData, unknown, InqueryInOrder>({
		mutationFn: async data => inqueryOrder(data)
	})

	return result
}

export default useSendInquery
