/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
	AspectRatio,
	Box,
	Card,
	createStyles,
	Group,
	Image,
	Paper,
	Text,
	Title
} from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'
import { motion } from 'framer-motion'
import type { ReactElement } from 'react'
import { useState } from 'react'
import { Share as ShareIcon, Star as StarIcon } from 'tabler-icons-react'
import { titlecase } from 'utils'

const useStyles = createStyles(theme => ({
	card: {
		minHeight: '240px',
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
	},

	like: {
		color: theme.colors.red[6]
	},

	label: {
		textTransform: 'uppercase',
		fontSize: theme.fontSizes.xs,
		fontWeight: 700
	},
	actionCard: {
		color: theme.colors[theme.primaryColor][5],
		display: 'flex',
		gap: theme.spacing.xs / 2,
		alignItems: 'center',
		'.label': {
			lineHeight: '0.5em'
		},
		'&:hover': {
			color: '#fff',
			transition: 'color position 0.2s ease-in-out',
			transform: 'translateY(-4px)',
			backgroundColor: theme.colors[theme.primaryColor][6]
		}
	},
	imgHero: {
		maxWidth: '100%',
		height: 'auto',
		'figure,figure>div': {
			height: '100%',
			width: '100%'
		}
	}
}))

interface BadgeCardProperties {
	image: string
	title: string
	description: string
}

export default function CvRepoCard({
	image,
	title,
	description
}: BadgeCardProperties): ReactElement {
	const { width } = useViewportSize()
	const { classes, theme, cx } = useStyles()
	const [scale, setScale] = useState(720)
	const onHoverStart = (): void => {
		setScale(420)
	}

	const onHoverEnd = (): void => {
		setScale(720)
	}
	return (
		<motion.div
			whileHover={{
				scale: 1.05,
				transition: { duration: 300 / 1000 }
			}}
			onHoverStart={onHoverStart}
			onTapStart={onHoverStart}
			onTouchEndCapture={onHoverEnd}
			onHoverEnd={onHoverEnd}
			whileTap={{
				scale: 1.05,
				transition: { duration: 300 / 1000 }
			}}
		>
			<Card
				withBorder
				radius='md'
				className={`${classes.card} p-2 md:p-4`}
				style={{
					maxWidth: width <= 600 ? width - theme.spacing.md * 2 : 980 / 3
				}}
			>
				<Box className='relative'>
					<AspectRatio
						ratio={1080 / scale}
						sx={{
							maxWidth:
								width <= 600 ? width - (theme.spacing.md + 8) * 2 : 980 / 3
						}}
					>
						<Image
							src={image}
							className={cx(classes.imgHero, 'overflow-hidden rounded-lg')}
							radius={theme.radius.md}
							alt={title}
							withPlaceholder
						/>
					</AspectRatio>
					<Box className='absolute bottom-0 left-0 right-0 -mb-3 pl-2'>
						<Group spacing={4}>
							<Paper
								className={classes.actionCard}
								shadow='lg'
								radius='lg'
								p='xs'
								withBorder
							>
								<ShareIcon size={16} />
							</Paper>
							<Paper
								className={classes.actionCard}
								shadow='lg'
								radius='lg'
								p='xs'
								withBorder
							>
								<StarIcon size={16} />
								{/* <Text className='label'>0</Text> */}
							</Paper>
						</Group>
					</Box>
				</Box>

				<Box
					className='mx-2 mt-4 mb-6'
					style={{
						maxWidth:
							width <= 600 ? width - (theme.spacing.md + 8) * 2 : 980 / 3
					}}
				>
					<Group position='apart'>
						<Title className='line-clamp-1' order={4}>
							{titlecase(title)}
						</Title>
					</Group>
					{scale !== 720 && (
						<motion.div>
							<Text size='sm' mt='xs' lineClamp={3}>
								{description}
							</Text>
						</motion.div>
					)}
				</Box>
			</Card>
		</motion.div>
	)
}
