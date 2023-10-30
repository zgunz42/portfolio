import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { getPaymentList } from 'api'
import type { IpayMuDatum } from 'types'

export default function usePaymentList(): UseQueryResult<IpayMuDatum[]> {
	const result = useQuery(['payments'], async () => getPaymentList())

	return result
}
