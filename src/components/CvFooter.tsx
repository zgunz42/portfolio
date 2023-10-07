/* eslint-disable @typescript-eslint/no-magic-numbers */
import { ActionIcon, Anchor, Group } from '@mantine/core'
import {
	BrandFacebook,
	BrandInstagram,
	BrandLinkedin,
	BrandTwitter,
	BrandWhatsapp
} from 'tabler-icons-react'
import classes from './CvFooter.module.css'
import CvLanguageSwitcher from './CvLanguageSwitcher'
import CvLogo from './CvLogo'

interface FooterCenteredProperties {
	links: { link: string; label: string }[]
}

export default function CvFooterCentered({
	links
}: FooterCenteredProperties): CompElement {
	const items = links.map(link => (
		<Anchor<'a'>
			color='dimmed'
			key={link.label}
			href={link.link}
			style={{ lineHeight: 1 }}
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

				<Group gap={0} justify='right'>
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
