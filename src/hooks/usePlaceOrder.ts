import type { UseMutationResult } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { placeOrder } from 'api'
import type { IpayMuDirectPayData, ToupRequest } from 'types'

export default function usePlaceOrder(): UseMutationResult<
	IpayMuDirectPayData,
	unknown,
	ToupRequest
> {
	const result = useMutation<IpayMuDirectPayData, unknown, ToupRequest>({
		mutationFn: async data => placeOrder(data)
	})

	return result
}
