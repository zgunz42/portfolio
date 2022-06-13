/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
	Burger,
	Container,
	createStyles,
	Group,
	Header,
	Transition
} from '@mantine/core'
import { useBooleanToggle, useMediaQuery, useScrollLock } from '@mantine/hooks'
import CvLogo from 'components/CvLogo'
import type { ReactElement } from 'react'
import { useState } from 'react'

const useStyles = createStyles(theme => ({
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '100%'
	},
	outerHeader: {
		backgroundColor: '#1b1a2ea9',
		border: 'none',
		boxShadow: '0px 10px 10px 0px rgba(9, 5, 29, 0.171)',
		backdropFilter: 'blur(15px)'
	},
	links: {
		[theme.fn.smallerThan('xs')]: {
			display: 'flex',
			flexDirection: 'column',
			gap: '1rem',
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[7]
					: theme.colors.gray[7],
			width: '100%',
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			padding: theme.spacing.sm,
			paddingTop: 60,
			paddingBottom: theme.spacing.md,
			boxShadow: '0px 10px 10px 0px rgba(9, 5, 29, 0.171)'
		}
	},

	burger: {
		[theme.fn.largerThan('xs')]: {
			display: 'none'
		}
	},

	link: {
		display: 'block',
		lineHeight: 1,
		padding: '8px 12px',
		borderRadius: theme.radius.sm,
		textDecoration: 'none',
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 700,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[6]
					: theme.colors.gray[0]
		},
		[theme.fn.smallerThan('xs')]: {
			padding: '12px 16px',
			width: '100%'
		}
	},

	linkActive: {
		'&, &:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
					: theme.colors[theme.primaryColor][0],
			color:
				theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7]
		}
	},
	hightlight: {
		'&, &:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.fn.rgba(theme.colors[theme.primaryColor][9], 1)
					: theme.colors[theme.primaryColor][7],
			color:
				theme.colorScheme !== 'dark'
					? theme.colors.dark[7]
					: theme.colors.gray[0]
		}
	},
	logo: {
		zIndex: 1
	}
}))

interface CvHeaderProperties {
	links: { link: string; label: string; hightlight?: boolean }[]
}

const scaleY = {
	in: { opacity: 1, transform: 'scaleY(1)' },
	out: { opacity: 0, transform: 'scaleY(0)' },
	common: { transformOrigin: 'top' },
	transitionProperty: 'transform, opacity'
}

export default function CvHeader({ links }: CvHeaderProperties): ReactElement {
	const [opened, toggleOpened] = useBooleanToggle(false)
	const [active, setActive] = useState(links[0].link)
	const { classes, cx } = useStyles()
	const [scrollLocked, setScrollLocked] = useScrollLock()
	const isMobile = useMediaQuery('(max-width: 755px)')

	const onToggleBurger = (): void => {
		toggleOpened()
		setScrollLocked(!scrollLocked)
	}

	const items = links.map(link => (
		<a
			key={link.label}
			href={link.link}
			className={cx(classes.link, {
				[classes.linkActive]: active === link.link,
				[classes.hightlight]: link.hightlight
			})}
			// eslint-disable-next-line react/jsx-handler-names, @typescript-eslint/explicit-function-return-type
			onClick={event => {
				event.preventDefault()
				setActive(link.link)
			}}
		>
			{link.label}
		</a>
	))

	return (
		<Header className={classes.outerHeader} height={60}>
			<Container className={classes.header}>
				<CvLogo className={classes.logo} width={116.243} height={30} />
				{isMobile ? (
					<Transition
						mounted={opened}
						transition={scaleY}
						duration={400}
						timingFunction='ease'
					>
						{
							// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
							styles => (
								<Group spacing={5} className={classes.links} style={styles}>
									{items}
								</Group>
							)
						}
					</Transition>
				) : (
					<Group spacing={5} className={classes.links}>
						{items}
					</Group>
				)}

				<Burger
					opened={opened}
					onClick={onToggleBurger}
					className={classes.burger}
					color='white'
					size='sm'
				/>
			</Container>
		</Header>
	)
}
