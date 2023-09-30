import { Avatar, Group, Select, Text } from '@mantine/core'
import type { IChoiceItem, TypeLanguages } from 'constant'
import { LanguageChoice } from 'constant'
import useLocale from 'hooks/useLocale'
import type { ReactElement } from 'react'
import { forwardRef } from 'react'
import { useLanguageContext } from './CvLanguageContext'

const SelectItem = forwardRef<HTMLDivElement, IChoiceItem>(
	({ flag, name, ...others }: IChoiceItem, reference) => (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div ref={reference} {...others}>
			<Group noWrap>
				<Avatar src={`/images/${flag}`} />

				<div>
					<Text size='sm'>{name}</Text>
				</div>
			</Group>
		</div>
	)
)

function getLanguageName(language: TypeLanguages): string {
	return LanguageChoice.find(item => item.value === language)?.name ?? ''
}

// eslint-disable-next-line @typescript-eslint/no-type-alias
type Properties = Omit<
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	Parameters<typeof Select>[0],
	'data' | 'itemComponent' | 'onChange' | 'value'
>

export default function CvLanguageSwitcher(
	properties: Properties
): ReactElement {
	const { language, setLanguage } = useLanguageContext()
	const { $t } = useLocale()
	const onChangeLanguage = (value: TypeLanguages): void => {
		setLanguage(value)
	}

	return (
		<Select
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...properties}
			label={$t('widget.language.title')}
			placeholder={getLanguageName(language)}
			value={language}
			data={LanguageChoice}
			itemComponent={SelectItem}
			onChange={onChangeLanguage}
		/>
	)
}
