import { Languages } from 'constant'
import { useIntl } from 'react-intl'

// eslint-disable-next-line @typescript-eslint/no-type-alias
type TransType = Pick<ReturnType<typeof useIntl>, '$t'>
// eslint-disable-next-line @typescript-eslint/no-type-alias
type TransMarkdownType = Parameters<TransType['$t']>
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useLocale() {
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { $t, locale } = useIntl()
	let language
	switch (locale) {
		case Languages['0']:
			language = Languages['0']
			break
		case Languages['1']:
			language = Languages['1']
			break
		default:
			console.log('Unknown locale')
			console.log(locale)
			language = Languages['0']
			break
	}
	return {
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		$t: <T = string>(
			id: string,
			values?: TransMarkdownType['1'],
			options?: TransMarkdownType['2']
		): T => $t({ id }, values, options) as unknown as T,
		locale: language
	}
}
