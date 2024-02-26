import { Badge, Box, Group, Text, Title } from '@mantine/core'
import type { MouseEventHandler } from 'react'
import { ArrowRight } from 'tabler-icons-react'
import classes from '../themes/styles.module.css'

interface Properties {
	tags: string[]
	title: string
	description: string
	readTime: number
	onMoreClick?: MouseEventHandler<HTMLDivElement>
}

function CvBlogCard({
	tags,
	title,
	description,
	readTime,
	onMoreClick
}: Properties): CompElement {
	return (
		<Box className={classes['blog-card']}>
			<Box className={classes['card-tag']}>
				{tags.map((tag: string) => (
					<Badge key={tag} size='lg' radius='sm'>
						{tag}
					</Badge>
				))}
			</Box>
			<Title order={3} className={`${classes.shine} ${classes.title} my-4`}>
				{title}
			</Title>
			<Text className={classes.content} lineClamp={3}>
				{description}
			</Text>
			<Box>
				<Box className='mt-8 flex items-baseline justify-between text-gray-400'>
					<Group onClick={onMoreClick} className='shine' gap='xs'>
						<Text>Read More</Text>
						<ArrowRight />
					</Group>

					<Text>{readTime} minute read</Text>
				</Box>
				<Box className={classes.divider} />
			</Box>
		</Box>
	)
}
CvBlogCard.defaultProps = {
	onMoreClick: undefined
}
export default CvBlogCard
