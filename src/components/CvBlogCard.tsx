import { Badge, Box, Group, Text, Title } from '@mantine/core'
import type { MouseEventHandler, ReactElement } from 'react'
import { ArrowRight } from 'tabler-icons-react'
import useAppStyles from 'themes/styles'

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
}: Properties): ReactElement {
	const { classes } = useAppStyles()
	return (
		<Box className={classes.blogCard}>
			<Box className='flex items-center gap-2'>
				{tags.map((tag: string) => (
					<Badge key={tag} size='lg' radius='sm'>
						{tag}
					</Badge>
				))}
			</Box>
			<Title order={3} className='shine title my-4'>
				{title}
			</Title>
			<Text className='content' lineClamp={3}>
				{description}
			</Text>
			<Box>
				<Box className='mt-8 flex items-baseline justify-between text-gray-400'>
					<Group onClick={onMoreClick} className='shine' spacing='xs'>
						<Text>Read More</Text>
						<ArrowRight />
					</Group>

					<Text>{readTime} minute read</Text>
				</Box>
				<Box className='divider' />
			</Box>
		</Box>
	)
}
CvBlogCard.defaultProps = {
	onMoreClick: undefined
}
export default CvBlogCard
