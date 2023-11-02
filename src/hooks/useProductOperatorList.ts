import { useQuery } from '@tanstack/react-query'
import { getOperatorList } from 'api'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useProductOperatorList(categoryCode: string) {
	const result = useQuery(
		['products', categoryCode],
		async () => getOperatorList(categoryCode),
		{
			initialData: [],
			enabled: false
		}
	)

	return result
}
