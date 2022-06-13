/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
	BackgroundImage,
	Badge,
	Box,
	Button,
	Container,
	createStyles,
	Group,
	Image,
	Text,
	Title
} from '@mantine/core'
import type { ReactElement } from 'react'

const useStyles = createStyles(theme => ({
	layout: {
		color: theme.colors.gray[0]
	},
	inner: {
		display: 'flex',
		justifyContent: 'space-between',
		paddingTop: theme.spacing.xl * 4 + 60,
		paddingBottom: theme.spacing.xl * 4,
		[theme.fn.smallerThan('md')]: {
			paddingTop: theme.spacing.md * 4,
			textAlign: 'center',
			flexWrap: 'wrap',
			flexDirection: 'column-reverse'
		}
	},

	content: {
		flex: 3,
		marginTop: 60,
		marginRight: theme.spacing.xl * 3,

		[theme.fn.smallerThan('md')]: {
			maxWidth: '100%',
			marginRight: 0,
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
		flex: 1,
		height: '100%',
		borderRadius: '50%',
		overflow: 'hidden',
		[theme.fn.smallerThan('md')]: {
			width: '50%',
			display: 'block',
			margin: 'auto',
			marginBottom: theme.spacing.sm * 2,
			flex: 1
		}
	},

	highlight: {
		position: 'relative',
		backgroundColor:
			theme.colorScheme === 'dark'
				? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
				: theme.colors[theme.primaryColor][0],
		borderRadius: theme.radius.sm,
		padding: '4px 12px'
	}
}))

interface CvHeroProperties {
	avatarUrl: string
	name: string
	skills: {
		name: string
		level: string
		experience: number
	}[]
	bio: string
}

export default function CvHero({
	avatarUrl,
	name,
	skills,
	bio
}: CvHeroProperties): ReactElement {
	const { classes } = useStyles()
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

							<Group mt={30} spacing='sm'>
								{skills.map(skill => (
									<Badge
										radius='sm'
										key={skill.name}
										leftSection={
											<Image
												className='h-full w-full'
												src='https://icongr.am/devicon/react-original.svg?size=24&amp;color=currentColor'
											/>
										}
										size='lg'
									>
										{skill.name}
									</Badge>
								))}
							</Group>

							<Group mt={30}>
								<Button
									variant='outline'
									radius='xl'
									size='md'
									className={classes.control}
								>
									View Projects
								</Button>
								<Button
									variant='gradient'
									gradient={{ from: 'indigo', to: 'cyan', deg: 35 }}
									radius='xl'
									size='md'
									className={classes.control}
								>
									Download CV
								</Button>
							</Group>
						</div>
						<Image
							src={avatarUrl}
							alt={`${name}'s Photo`}
							className={classes.image}
						/>
					</div>
				</Container>
			</BackgroundImage>
		</Box>
	)
}
