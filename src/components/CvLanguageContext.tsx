/* eslint-disable @typescript-eslint/no-magic-numbers */
import { useLocalStorage } from '@mantine/hooks'
import type { TypeLanguages } from 'constant'
import { Languages } from 'constant'
import enLanguages from 'data/langs/en-US/languages.json'
import idLanguages from 'data/langs/id-ID/languages.json'
import type { ReactElement, ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { IntlProvider } from 'react-intl'
import { getBrowserLanguage, localeName } from 'utils'

interface ICvLanguageContext {
	language: TypeLanguages
	setLanguage: (language: TypeLanguages) => void
}

const LanguageContext = createContext<ICvLanguageContext>({
	language: Languages[0],
	setLanguage: () => {}
})
function loadLocalMessages(locale: string): Record<string, string> {
	let messages: Record<string, string> = {}
	switch (locale) {
		case Languages[0]:
			messages = enLanguages
			break
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		case Languages[1]:
			messages = idLanguages
			break
		default:
			messages = enLanguages
			break
	}
	return messages
}
function keyPairQuery(search: string): Record<string, string> {
	const query = new URLSearchParams(search)
	const result: Record<string, string> = {}
	for (const [key, value] of query.entries()) {
		result[key] = value
	}
	return result
}
export function useLanguageContext(): ICvLanguageContext {
	const { language, setLanguage } = useContext(LanguageContext)

	return {
		language,
		setLanguage
	}
}

export default function CvLocalProvider({
	children
}: {
	children: ReactNode
}): ReactElement {
	const { search } = window.location
	const searchQuery = search !== '' ? keyPairQuery(search) : undefined
	const queryLocale =
		typeof searchQuery?.lang === 'string'
			? localeName(searchQuery.lang)
			: undefined
	const [locale, setLocale] = useLocalStorage<TypeLanguages>({
		key: 'language',
		defaultValue: queryLocale ?? getBrowserLanguage()
	})

	const languageValue = useMemo(
		() => ({
			language: locale,
			setLanguage: setLocale
		}),
		[locale, setLocale]
	)

	return (
		<IntlProvider
			messages={loadLocalMessages(queryLocale ?? locale)}
			locale={queryLocale ?? locale}
		>
			<LanguageContext.Provider value={languageValue}>
				{children}
			</LanguageContext.Provider>
		</IntlProvider>
	)
}
