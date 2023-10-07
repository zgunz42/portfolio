/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
	Avatar,
	Combobox,
	Group,
	Input,
	InputBase,
	Text,
	useCombobox
} from '@mantine/core'
import type { IChoiceItem, TypeLanguages } from 'constant'
import { LanguageChoice } from 'constant'
import useLocale from 'hooks/useLocale'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { forwardRef } from 'react'
import type { ArgumentsType } from 'vitest'
import { useLanguageContext } from './CvLanguageContext'

const SelectItem = forwardRef<HTMLDivElement, IChoiceItem>(
	({ flag, name, label, value, ...others }: IChoiceItem, reference) => (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<Combobox.Option value={value} key={value} ref={reference} {...others}>
			<Group>
				<Avatar src={`/images/${flag}`} />

				<div>
					<Text size='sm'>{name}</Text>
				</div>
			</Group>
		</Combobox.Option>
	)
)

function getLanguageName(language: TypeLanguages): string {
	return LanguageChoice.find(item => item.value === language)?.name ?? ''
}

export default function CvLanguageSwitcher(
	properties: ArgumentsType<typeof Combobox>[0]
): ReactElement {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption()
	})
	const { language, setLanguage } = useLanguageContext()
	// const [value, setValue] = useState<string | null>(null)
	const { $t } = useLocale()
	const router = useRouter()
	const languageName = getLanguageName(language)

	const onToggleClick = (): void => {
		combobox.toggleDropdown()
	}

	const onComboClick = (value_: string): void => {
		setLanguage(value_ as typeof language)
		combobox.closeDropdown()
		void router.push(router.pathname, router.pathname, { locale: value_ })
	}

	return (
		<Combobox
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...properties}
			// placeholder={getLanguageName(language)}
			// value={language}
			// data={LanguageChoice}
			// itemComponent={SelectItem}
			// onChange={onChangeLanguage}
			onOptionSubmit={onComboClick}
		>
			<Combobox.Target>
				<InputBase
					component='button'
					pointer
					rightSection={<Combobox.Chevron />}
					onClick={onToggleClick}
				>
					{languageName || (
						<Input.Placeholder>{$t('widget.language.title')}</Input.Placeholder>
					)}
				</InputBase>
			</Combobox.Target>

			<Combobox.Dropdown>
				<Combobox.Options>
					{LanguageChoice.map((item, index) => (
						// eslint-disable-next-line react/jsx-props-no-spreading, react/no-array-index-key
						<SelectItem {...item} key={index} />
					))}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	)
}
