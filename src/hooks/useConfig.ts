import type { IConfig } from 'api'
import { getConfig } from 'api'
import type { UseQueryResult } from 'react-query'
import { useQuery } from 'react-query'
import useLocale from './useLocale'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useConfig(): UseQueryResult<IConfig> {
	const { locale } = useLocale()
	const result = useQuery('getConfig', getConfig.bind(undefined, locale))

	return result
}
