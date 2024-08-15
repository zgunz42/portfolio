import { useQuery } from '@tanstack/react-query'
import { getProductList } from 'api'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useProductList(operatorCode: string) {
	const result = useQuery(
		['products', operatorCode],
		async () => getProductList(operatorCode),
		{
			initialData: [],
			enabled: false
		}
	)

	return result
}