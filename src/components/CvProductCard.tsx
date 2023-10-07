/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Badge, Card, Group, Image, Text } from '@mantine/core'
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
	label
}: CvProductCardProperties): CompElement {
	return (
		<Card withBorder radius='md' p='md' className={classes.card}>
			<Card.Section>
				<Image src={thumbnail} alt={code} height={180} />
			</Card.Section>
			<Card.Section className={classes.section} mt='md'>
				<Group justify='apart'>
					<Text fz='lg' fw={500}>
						{title}
					</Text>
					label ? (
					<Badge size='sm' variant='light'>
						{label}
					</Badge>
					) : null
				</Group>
				<Text fz='sm' mt='xs'>
					{description}
				</Text>
			</Card.Section>
		</Card>
	)
}

CvProductCard.defaultProps = {
	label: undefined
}
