import { useQuery } from '@tanstack/react-query'
import { getProductList } from 'api'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useProductList() {
	const result = useQuery(['products'], async () => getProductList())

	return result
}
