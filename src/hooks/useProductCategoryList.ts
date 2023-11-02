import { useQuery } from '@tanstack/react-query'
import { getCategoryList } from 'api'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useProductCategoryList() {
	const result = useQuery(
		['product_categories'],
		async () => getCategoryList(),
		{
			initialData: []
		}
	)

	return result
}
