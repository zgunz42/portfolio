/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
	Blockquote,
	Box,
	Container,
	createStyles,
	Image,
	List,
	SimpleGrid,
	Stack,
	Text,
	ThemeIcon,
	Title,
	useMantineTheme
} from '@mantine/core'
import CvPageLayout from 'components/CvPageLayout'
import useConfig from 'hooks/useConfig'
import useLocale from 'hooks/useLocale'
import type { ReactElement } from 'react'
import GitHubCalendar from 'react-github-calendar'
import { Helmet } from 'react-helmet'
import { CircleCheck } from 'tabler-icons-react'
import { composeImageUrl } from 'utils'

const useStyles = createStyles(theme => ({
	wrapper: {
		display: 'flex',
		color: theme.colorScheme === 'dark' ? '#fff' : '#000',
		[theme.fn.smallerThan('md')]: {
			flexDirection: 'column-reverse'
		}
	},
	introduction: {
		flex: 2,
		[theme.fn.smallerThan('md')]: {
			flex: 1
		}
	},
	titleDecorate: {
		color:
			theme.colorScheme === 'dark'
				? theme.colors.gray[0]
				: theme.colors.gray[8],
		marginBottom: theme.spacing.xl,
		span: {
			color: theme.colors[theme.primaryColor][5]
		},
		[theme.fn.smallerThan('md')]: {
			textAlign: 'center'
		}
	},
	filterBg: {
		filter: 'grayscale(100%) invert(100%)'
	},
	title: {
		textAlign: 'center',
		color:
			theme.colorScheme === 'dark'
				? theme.colors.gray[0]
				: theme.colors.gray[8],
		marginBottom: theme.spacing.xl,
		span: {
			color: theme.colors[theme.primaryColor][5]
		}
	},
	introductionImage: {
		flex: 1
	},
	cardSkill: {
		borderRadius: theme.radius.md,
		cursor: 'pointer',
		padding: 64,
		position: 'relative',
		overflow: 'hidden',
		border: `${0.2 / 3}rem solid #fff`,
		boxShadow: `0 0 ${0.2 / 2}rem #fff,
    0 0 ${0.2 / 2}rem #fff,
    0 0 ${2 / 3}rem ${theme.colors[theme.primaryColor][3]},
    0 0 ${0.8 / 3}rem ${theme.colors[theme.primaryColor][3]},
    0 0 ${2.8 / 3}rem ${theme.colors[theme.primaryColor][3]},
    inset 0 0 ${1.3 / 2}rem ${theme.colors[theme.primaryColor][3]}`,
		color: theme.colorScheme === 'dark' ? '#fff' : '#000',
		'.card-skill-details': {
			padding: theme.spacing.lg,
			position: 'absolute',
			bottom: 0,
			left: 0,
			right: 0,
			backgroundColor: theme.colors[theme.primaryColor][5],
			textAlign: 'center',
			opacity: 0,
			[theme.fn.smallerThan('md')]: {
				padding: theme.spacing.sm,
				fontSize: theme.fontSizes.md
			}
		},
		'&:hover': {
			transform: 'scale(1.05)',
			border: `${0.2 / 2}rem solid #fff`,
			boxShadow: `0 0 ${0.2 / 2}rem #fff,
			0 0 ${0.2 / 2}rem #fff,
			0 0 ${2 / 2}rem ${theme.colors[theme.primaryColor][5]},
			0 0 ${0.8 / 2}rem ${theme.colors[theme.primaryColor][5]},
			0 0 ${2.8 / 2}rem ${theme.colors[theme.primaryColor][5]},
			inset 0 0 ${1.3 / 2}rem ${theme.colors[theme.primaryColor][5]}`,
			'.card-skill-details': {
				opacity: 1
			}
		}
	}
}))

function AboutPage(): ReactElement {
	const { data } = useConfig()
	const theme = useMantineTheme()
	const { classes } = useStyles()
	const { $t } = useLocale()
	return (
		<CvPageLayout className='page'>
			<Stack align='stretch' justify='center'>
				<Helmet>
					<title>
						{$t('about.title')} | {data?.fullName}
					</title>
				</Helmet>
				<Container className='mt-12'>
					<Box className={classes.wrapper}>
						<Box className={`${classes.introduction} mb-8`}>
							<Title
								dangerouslySetInnerHTML={{
									__html: $t('about.headline')
								}}
								className={classes.titleDecorate}
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
						<Box className={classes.introductionImage}>
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
							cols={4}
							breakpoints={[
								{ maxWidth: 980, cols: 3, spacing: 'md' },
								{ maxWidth: 755, cols: 2, spacing: 'sm' }
							]}
						>
							{data?.about.skills.map(({ icon, name }) => (
								<Box key={name} className={classes.cardSkill}>
									<Image src={composeImageUrl(icon, 320 / 3)} alt={name} />
									<Box className='card-skill-details'>
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
							cols={4}
							breakpoints={[
								{ maxWidth: 980, cols: 3, spacing: 'md' },
								{ maxWidth: 755, cols: 2, spacing: 'sm' }
							]}
						>
							{data?.about.tools.map(({ icon, name, hasColor }) => (
								<Box key={name} className={classes.cardSkill}>
									<Image
										src={composeImageUrl(icon, 320 / 3, 'ffffff')}
										className={hasColor ? classes.filterBg : ''}
										alt={name}
									/>
									<Box className='card-skill-details'>
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
								color: theme.colorScheme === 'light' ? '#000' : '#fff'
							}}
							color={theme.colors[theme.primaryColor][5]}
						/>
					) : undefined}
				</Container>
			</Stack>
		</CvPageLayout>
	)
}

export default AboutPage
