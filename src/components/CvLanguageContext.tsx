/* eslint-disable @typescript-eslint/no-magic-numbers */
import { useLocalStorage } from '@mantine/hooks'
import type { TypeLanguages } from 'constant'
import { Languages } from 'constant'
import enLanguages from 'data/langs/en-US/languages.json'
import idLanguages from 'data/langs/id-ID/languages.json'
import { useRouter } from 'next/router'
import type { ReactElement, ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { IntlProvider } from 'react-intl'

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
	// const { search } = window.location
	const { locale: routeLocale } = useRouter()

	if (
		routeLocale === undefined ||
		(routeLocale !== 'en-US' && routeLocale !== 'id-ID')
	) {
		throw new Error('routeLocale is undefined')
	}

	const [locale, setLocale] = useLocalStorage<TypeLanguages>({
		key: 'language',
		defaultValue: routeLocale
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
			messages={loadLocalMessages(routeLocale)}
			locale={routeLocale}
		>
			<LanguageContext.Provider value={languageValue}>
				{children}
			</LanguageContext.Provider>
		</IntlProvider>
	)
}
