/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
	AspectRatio,
	Box,
	Card,
	Group,
	Paper,
	Text,
	Title
} from '@mantine/core'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Share as ShareIcon, Star as StarIcon } from 'tabler-icons-react'
import { theme } from 'themes/theme'
import { titlecase } from 'utils'
import CvImage from './CvImage'
import classes from './CvRepoCard.module.css'

interface BadgeCardProperties {
	image: string
	title: string
	description: string
}

export default function CvRepoCard({
	image,
	title,
	description
}: BadgeCardProperties): CompElement {
	// const { theme, cx } = useStyles()
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
			<Card withBorder radius='md' className={`${classes.card} p-2 md:p-4`}>
				<Box className='relative'>
					<AspectRatio ratio={1080 / scale}>
						<CvImage
							src={image}
							className={classes['image-hero']}
							fill
							radius={theme.radius?.md}
							alt={title}
						/>
					</AspectRatio>
					<Box className='absolute bottom-0 left-0 right-0 -mb-3 pl-2'>
						<Group gap={4}>
							<Paper
								className={classes['action-card']}
								shadow='lg'
								radius='lg'
								p='xs'
								withBorder
							>
								<ShareIcon size={16} />
							</Paper>
							<Paper
								className={classes['action-card']}
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

				<Box className='mx-2 mt-4 mb-6'>
					<Group justify='space-around'>
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
