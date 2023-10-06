import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { IConfig } from 'api'
import { getConfig } from 'api'
import useLocale from './useLocale'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useConfig(): UseQueryResult<IConfig> {
	const { locale } = useLocale()
	const result = useQuery(
		['getConfig', locale],
		getConfig.bind(undefined, locale)
	)

	return result
}
