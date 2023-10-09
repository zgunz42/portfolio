/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
	ActionIcon,
	Badge,
	Box,
	Button,
	Card,
	Flex,
	Image,
	Stack,
	Text,
	Tooltip
} from '@mantine/core'
import { IconInfoCircle as InfoCircleIcon } from '@tabler/icons-react'
import useLocale from 'hooks/useLocale'
import { FormattedNumber } from 'react-intl'
import classes from './CvProductCard.module.css'

interface CvProductCardProperties {
	code: string
	thumbnail: string
	period: string
	title: string
	price: number
	isActive: boolean
	activePeriod: string
	description: string
	label?: string
}

export default function CvProductCard({
	code,
	title,
	thumbnail,
	description,
	price,
	label
}: CvProductCardProperties): CompElement {
	const { $t } = useLocale()

	return (
		<Card withBorder radius='md' p='md' className={classes.card}>
			<Card.Section>
				<Box className={classes['card-image-box']}>
					<Image
						classNames={{ root: classes['card-image'] }}
						src={thumbnail}
						fallbackSrc='https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png'
						alt={code}
						height={180}
					/>
					<Tooltip
						arrowOffset={10}
						arrowSize={4}
						label={description}
						withArrow
						position='top-start'
					>
						<ActionIcon
							classNames={{ root: classes['card-image-overlay'] }}
							variant='filled'
							radius='xl'
							aria-label='Info'
						>
							<InfoCircleIcon
								style={{ width: '70%', height: '70%' }}
								stroke={1.5}
							/>
						</ActionIcon>
					</Tooltip>
				</Box>
			</Card.Section>
			<Card.Section className={classes.section} mt='md'>
				<Stack>
					<Flex justify='space-between' gap='sm' align='center'>
						<Text fz='md' fw={600} lineClamp={1}>
							{title}
						</Text>
						{label && label !== '0' ? (
							<Badge size='sm' variant='light'>
								{`${label} ${$t('days')}`}
							</Badge>
						) : undefined}
					</Flex>
					<Text fw={700} c='red'>
						<FormattedNumber
							value={price}
							// eslint-disable-next-line react/style-prop-object
							style='currency'
							currency='IDR'
						/>
					</Text>
				</Stack>
			</Card.Section>
			<Button variant='light' color='blue' fullWidth mt='md' radius='md'>
				{$t('buy-now')}
			</Button>
		</Card>
	)
}

CvProductCard.defaultProps = {
	label: undefined
}
