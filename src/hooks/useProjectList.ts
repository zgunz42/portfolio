import { useInfiniteQuery } from '@tanstack/react-query'
import type { IProjectList } from 'api'
import { getProjectListPaged } from 'api'
import { CountMargin, FirstPage } from 'constant'
import LoadMoreError from 'errors/LoadMoreError'
import useLocale from './useLocale'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function useProjectList() {
	const { locale } = useLocale()
	const { data, error, isError, isLoading, fetchNextPage } = useInfiniteQuery<
		IProjectList[],
		unknown,
		IProjectList[],
		['getProjectList', string]
	>(
		['getProjectList', locale],
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		async ({ pageParam }) =>
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			getProjectListPaged(pageParam ?? FirstPage, locale),
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

export default useProjectList
