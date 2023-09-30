/* eslint-disable @typescript-eslint/no-magic-numbers */
import { ActionIcon, Anchor, createStyles, Group } from '@mantine/core'
import type { ReactElement } from 'react'
import {
	BrandFacebook,
	BrandInstagram,
	BrandLinkedin,
	BrandTwitter,
	BrandWhatsapp
} from 'tabler-icons-react'
import CvLanguageSwitcher from './CvLanguageSwitcher'
import CvLogo from './CvLogo'

const useStyles = createStyles(theme => ({
	footer: {
		marginTop: 120,
		backgroundColor:
			theme.colorScheme === 'dark'
				? theme.colors.dark[7]
				: theme.colors.gray[0],
		borderTop: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
		}`
	},

	inner: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

		[theme.fn.smallerThan('sm')]: {
			flexDirection: 'column'
		}
	},

	links: {
		[theme.fn.smallerThan('sm')]: {
			marginTop: theme.spacing.lg,
			marginBottom: theme.spacing.sm
		}
	}
}))

interface FooterCenteredProperties {
	links: { link: string; label: string }[]
}

export default function CvFooterCentered({
	links
}: FooterCenteredProperties): ReactElement {
	const { classes } = useStyles()
	const items = links.map(link => (
		<Anchor<'a'>
			color='dimmed'
			key={link.label}
			href={link.link}
			sx={{ lineHeight: 1 }}
			// eslint-disable-next-line react/jsx-handler-names, @typescript-eslint/explicit-function-return-type
			onClick={event => event.preventDefault()}
			size='sm'
		>
			{link.label}
		</Anchor>
	))

	return (
		<div className={classes.footer}>
			<div className={classes.inner}>
				<CvLogo
					className='hidden md:block'
					width={116.243 * 1.5}
					height={30 * 1.5}
				/>
				<CvLanguageSwitcher size='xs' />
			</div>
			<div className={classes.inner}>
				<Group className={`${classes.links} ml-3`}>{items}</Group>

				<Group spacing={0} position='right' noWrap>
					<ActionIcon className='hover:scale-125 hover:text-facebook' size='lg'>
						<BrandFacebook size={18} />
					</ActionIcon>
					<ActionIcon className='hover:scale-125 hover:text-twitter' size='lg'>
						<BrandTwitter size={18} />
					</ActionIcon>
					<ActionIcon
						className='hover:scale-125 hover:text-instagram'
						size='lg'
					>
						<BrandInstagram size={18} />
					</ActionIcon>
					<ActionIcon className='hover:scale-125 hover:text-linkedin' size='lg'>
						<BrandLinkedin size={18} />
					</ActionIcon>
					<ActionIcon className='hover:scale-125 hover:text-whatsapp' size='lg'>
						<BrandWhatsapp size={18} />
					</ActionIcon>
				</Group>
			</div>
		</div>
	)
}
