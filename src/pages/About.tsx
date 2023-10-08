/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
	Blockquote,
	Box,
	Container,
	Image,
	List,
	SimpleGrid,
	Stack,
	Text,
	ThemeIcon,
	Title
} from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import CvPageLayout from 'components/CvPageLayout'
import useConfig from 'hooks/useConfig'
import useLocale from 'hooks/useLocale'

import Head from 'next/head'
import type { ReactElement } from 'react'
import GitHubCalendar from 'react-github-calendar'
import { CircleCheck } from 'tabler-icons-react'
import { theme } from 'themes/theme'
import { composeImageUrl } from 'utils'
import classes from '../themes/about.module.css'

function AboutPage(): ReactElement {
	const { data } = useConfig()
	const colorScheme = useColorScheme()
	const { $t } = useLocale()
	return (
		<CvPageLayout className='page'>
			<Stack align='stretch' justify='center'>
				<Head>
					<title>
						{$t('about.title')} | {data?.fullName}
					</title>
				</Head>
				<Container className='mt-12'>
					<Box className={classes.wrapper}>
						<Box className={`${classes.introduction} mb-8`}>
							<Title
								dangerouslySetInnerHTML={{
									__html: $t('about.headline')
								}}
								className={classes['title-decoration']}
							/>
							<Text className='mt-4 mb-8'>{data?.about.intro}</Text>
							<Box className='mb-8'>
								<Text className='mb-2'>{$t('about.subheadline')}</Text>
								<List
									spacing='xs'
									size='sm'
									className='ml-2'
									center
									style={{
										columns: 2,
										maxHeight: 300
									}}
									icon={
										<ThemeIcon size={24} radius='xl'>
											<CircleCheck size={16} />
										</ThemeIcon>
									}
								>
									{data?.about.hobby.map(hobby => (
										<List.Item key={hobby}>{hobby}</List.Item>
									))}
								</List>
							</Box>
							<Blockquote cite={data?.fullName}>{data?.quote}</Blockquote>
						</Box>
						<Box className={classes['introduction-image']}>
							<Image
								src='/images/you%20got%20it%20boss.png'
								alt='working on job'
							/>
						</Box>
					</Box>
				</Container>
				<Container className='mt-12'>
					<Box>
						<Title
							dangerouslySetInnerHTML={{
								__html: $t('about.skills.title')
							}}
							className={classes.title}
						/>
					</Box>
					<Box>
						<SimpleGrid
							cols={{ lg: 4, md: 3, sm: 2, xs: 1 }}
							spacing={{ md: 'md', sm: 'sm' }}
						>
							{data?.about.skills.map(({ icon, name }) => (
								<Box key={name} className={classes['card-skill']}>
									<Image src={composeImageUrl(icon, 320 / 3)} alt={name} />
									<Box className={classes['card-skill-details']}>
										<Title order={3}>{name}</Title>
									</Box>
								</Box>
							))}
						</SimpleGrid>
					</Box>
				</Container>
				<Container className='mt-12'>
					<Box>
						<Title
							dangerouslySetInnerHTML={{
								__html: $t('about.tools.title')
							}}
							className={classes.title}
						/>
					</Box>
					<Box>
						<SimpleGrid
							cols={{ lg: 4, md: 3, sm: 2, xs: 1 }}
							spacing={{ md: 'md', sm: 'sm' }}
						>
							{data?.about.tools.map(({ icon, name, hasColor }) => (
								<Box key={name} className={classes['card-skill']}>
									<Image
										src={composeImageUrl(icon, 320 / 3, 'ffffff')}
										className={hasColor ? classes['filter-by'] : ''}
										alt={name}
									/>
									<Box className={classes['card-skill-details']}>
										<Title order={3}>{name}</Title>
									</Box>
								</Box>
							))}
						</SimpleGrid>
					</Box>
				</Container>
				<Container className='mt-12'>
					<Box>
						<Title
							dangerouslySetInnerHTML={{
								__html: $t('about.github.title')
							}}
							className={classes.title}
						/>
					</Box>
					{data?.github ? (
						<GitHubCalendar
							username={data.github}
							style={{
								color: colorScheme === 'light' ? '#000' : '#fff'
							}}
							color={theme.colors?.[theme.primaryColor ?? 'blue']?.[5]}
						/>
					) : undefined}
				</Container>
			</Stack>
		</CvPageLayout>
	)
}

export default AboutPage
