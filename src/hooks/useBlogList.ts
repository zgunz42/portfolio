import { useInfiniteQuery } from '@tanstack/react-query'
import type { IBlogListItem } from 'api'
import { getBlogListPaged } from 'api'
import { CountMargin, FirstPage } from 'constant'
import LoadMoreError from 'errors/LoadMoreError'
import useLocale from './useLocale'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function useBlogList() {
	const { locale } = useLocale()
	const { data, error, isError, isLoading, fetchNextPage } = useInfiniteQuery<
		IBlogListItem[],
		unknown,
		IBlogListItem[],
		['getBlogList', string]
	>(
		['getBlogList', locale],
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		async ({ pageParam }) => getBlogListPaged(pageParam ?? FirstPage, locale),
		{
			getNextPageParam: (_, b) => b.length + CountMargin
		}
	)

	return {
		data,
		error,
		isError,
		isLoading,
		fetchNextPage,
		isLoadMoreError: error !== null && error instanceof LoadMoreError
	}
}

export default useBlogList
