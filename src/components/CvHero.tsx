/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
	BackgroundImage,
	Box,
	Button,
	Container,
	createStyles,
	Group,
	Image,
	Text,
	Title
} from '@mantine/core'
import useLocale from 'hooks/useLocale'
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { FileDownload as FileDownloadIcon } from 'tabler-icons-react'
import CvProfileAvatar from './CvProfileAvatar'

const useStyles = createStyles(theme => ({
	layout: {
		color: theme.colors.gray[0]
	},
	inner: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		// paddingTop: theme.spacing.xl * 4 + 60,
		paddingBottom: theme.spacing.xl * 4,
		[theme.fn.smallerThan('md')]: {
			paddingTop: theme.spacing.md * 4,
			textAlign: 'center',
			flexWrap: 'wrap',
			flexDirection: 'column-reverse'
		}
	},

	content: {
		flex: 50,
		marginTop: 60,
		[theme.fn.smallerThan('md')]: {
			maxWidth: '100%',
			flex: 1
		}
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily ?? 'sans-serif'}`,
		fontSize: 44,
		lineHeight: 1.2,
		fontWeight: 900,

		[theme.fn.smallerThan('xs')]: {
			fontSize: 28
		}
	},

	subtitle: {
		fontFamily: `Greycliff CF, ${theme.fontFamily ?? 'sans-serif'}`,
		fontSize: 24,
		lineHeight: 1.2,
		maxWidth: theme.breakpoints.md
	},

	control: {
		[theme.fn.smallerThan('xs')]: {
			flex: 1
		}
	},

	image: {
		flex: 50,
		alignSelf: 'center',
		[theme.fn.smallerThan('md')]: {
			width: '80%',
			display: 'block',
			margin: 'auto',
			marginBottom: theme.spacing.sm,
			flex: 1
		}
	}
}))

interface CvHeroProperties {
	name: string
	bio: string
	github: string
}

export default function CvHero({
	name,
	bio,
	github
}: CvHeroProperties): ReactElement {
	const { classes } = useStyles()
	const { $t } = useLocale()
	return (
		<Box className={classes.layout}>
			<BackgroundImage src='/images/background.webp'>
				<Container className={classes.layout}>
					<div className={classes.inner}>
						<div className={classes.content}>
							<Title className={classes.title}>{name}</Title>
							<Text className={classes.subtitle} mt='md'>
								{bio}
							</Text>

							<Group mt={30} className='w-full' spacing='sm'>
								<Image
									src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${github}&layout=compact&text_color=1C7ED6&title_color=1C7ED6&bg_color=141321&count_private=true&include_all_commits=true&langs_count=10&hide_title=true`}
									alt='github status'
									className='w-full'
									style={{
										minHeight: 207
									}}
									withPlaceholder
									caption={
										<span>
											{$t('cv.hero.githubStatus')}
											<a
												target='_blank'
												className='ml-1 text-blue-500 underline'
												href='https://github-readme-stats.vercel.app'
												rel='noreferrer'
											>
												GithubReadmeStats
											</a>
										</span>
									}
								/>
							</Group>

							<Group mt={30} className='flex w-full justify-center'>
								<Button
									variant='outline'
									radius='xl'
									size='md'
									className={classes.control}
								>
									{$t('cv.hero.view_project')}
								</Button>
								<Button
									variant='gradient'
									component={Link}
									gradient={{ from: 'indigo', to: 'cyan', deg: 35 }}
									radius='xl'
									to='/download-cv'
									size='md'
									leftIcon={<FileDownloadIcon />}
									className={classes.control}
								>
									{$t('cv.hero.download_cv')}
								</Button>
							</Group>
						</div>
						<div className={classes.image}>
							<CvProfileAvatar imageUrl='/images/avatar.png' />
						</div>
					</div>
				</Container>
			</BackgroundImage>
		</Box>
	)
}
