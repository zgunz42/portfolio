/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Burger, Container, Group, Text, Transition } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import CvLogo from 'components/CvLogo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { RemoveScroll } from 'react-remove-scroll'
import {
	Apps,
	Ballpen,
	BuildingStore,
	FileDownload,
	Home,
	User,
	Wallpaper
} from 'tabler-icons-react'
import classes from './CvHeader.module.css'

interface CvHeaderProperties {
	links: { link: string; icon?: string; label: string; hightlight?: boolean }[]
}

const scaleY = {
	in: { opacity: 1, transform: 'scaleY(1)' },
	out: { opacity: 0, transform: 'scaleY(0)' },
	common: { transformOrigin: 'top' },
	transitionProperty: 'transform, opacity'
}

export default function CvHeader({ links }: CvHeaderProperties): ReactElement {
	const [opened, { toggle }] = useDisclosure()
	// const { classes, cx } = useStyles()
	const router = useRouter()
	// const [scrollLocked, setScrollLocked] = useScrollLock()
	const isMobile = useMediaQuery('(max-width: 769px)')
	console.log(isMobile, opened)
	const onToggleBurger = (): void => {
		toggle()
		// setScrollLocked(!scrollLocked)
	}

	const items = links.map(link => {
		let Icon: typeof Home | undefined
		switch (link.icon) {
			case 'home':
				Icon = Home
				break
			case 'user':
				Icon = User
				break
			case 'product':
				Icon = BuildingStore
				break
			case 'app':
				Icon = Apps
				break
			case 'download':
				Icon = FileDownload
				break
			case 'contact':
				Icon = Wallpaper
				break
			case 'blog':
				Icon = Ballpen
				break
			default:
				Icon = undefined
				break
		}

		const isActive = router.pathname === link.link

		return (
			<Link className='w-full md:w-auto' key={link.label} href={link.link}>
				<Text
					component='span'
					className={classes.link}
					mod={{ active: isActive, highlighted: link.hightlight }}
				>
					{Icon ? <Icon style={{ paddingBottom: 4 }} /> : undefined}
					<span>{link.label}</span>
				</Text>
			</Link>
		)
	})

	const removeScroll = isMobile && opened

	return (
		<RemoveScroll enabled={removeScroll}>
			<header className={classes['outer-header']}>
				<Container className={classes.header}>
					<Link href='/'>
						<CvLogo className={classes.logo} width={116.243} height={30} />
					</Link>
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
									<Group gap={5} className={classes.links} style={styles}>
										{items}
									</Group>
								)
							}
						</Transition>
					) : (
						<Group gap={5} className={classes.links}>
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
			</header>
		</RemoveScroll>
	)
}
