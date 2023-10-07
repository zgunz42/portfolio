import { getProductList } from 'api'
import { useQuery } from 'react-query'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useProductList() {
	const result = useQuery(['products'], async () => getProductList())

	return result
}
