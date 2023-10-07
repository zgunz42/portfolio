/* eslint-disable react/jsx-props-no-spreading */
import {
	Box,
	Container,
	List,
	SimpleGrid,
	Stack,
	Text,
	ThemeIcon,
	Title
} from '@mantine/core'
import CvContactForm from 'components/CvContactForm'
import CvPageLayout from 'components/CvPageLayout'
import useLocale from 'hooks/useLocale'
import Head from 'next/head'
import type { ReactElement } from 'react'
import { Mail, MapPin, PhoneCall } from 'tabler-icons-react'
import classes from '../themes/styles.module.css'

function ContactPage(): ReactElement {
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { $t } = useLocale()
	return (
		<CvPageLayout>
			<Stack>
				<Head>
					<title>{$t('contact')} | I Kadek Adi Gunawan</title>
				</Head>
				<Container className={classes.text}>
					<Title className={`${classes.title} mb-16 mt-24`}>
						{`${$t('contact')} `}
						<span>{$t('me')}</span>
					</Title>
					<SimpleGrid
						// eslint-disable-next-line @typescript-eslint/no-magic-numbers
						cols={{ lg: 2, md: 1 }}
						spacing={{ md: 'xl' }}
					>
						<Box>
							<Title order={2} className='mb-8'>
								{$t('lets_connect')}
							</Title>
							<Text>{$t('contact_text')}</Text>
							<List className='mt-8 mb-4 ml-4 max-w-xs' spacing='sm' center>
								<List.Item
									icon={
										<ThemeIcon color='blue' size={24} radius='xl'>
											<Mail size={16} />
										</ThemeIcon>
									}
								>
									adi_gunawan@live.com
								</List.Item>
								<List.Item
									icon={
										<ThemeIcon color='blue' size={24} radius='xl'>
											<PhoneCall size={16} />
										</ThemeIcon>
									}
								>
									+6283115541165
								</List.Item>
								<List.Item
									icon={
										<ThemeIcon color='blue' size={24} radius='xl'>
											<MapPin size={16} />
										</ThemeIcon>
									}
								>
									<address>
										Jl. Denpasar - Gilimanuk, Pekutatan, Jembrana Bali, Pos
										82262
									</address>
								</List.Item>
							</List>
							<iframe
								src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d553.7663449790308!2d114.82320715199927!3d-8.421536648958892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd3d410f8f0340b%3A0xebfd27139d4705ef!2sHRHF%2B9CW%2C%20Pekutatan%2C%20Kec.%20Pekutatan%2C%20Kabupaten%20Jembrana%2C%20Bali%2082262!5e0!3m2!1sid!2sid!4v1655365215018!5m2!1sid!2sid'
								width='100%'
								height='300'
								style={{ border: 0 }}
								allowFullScreen
								loading='lazy'
								title='map'
								sandbox='allow-forms allow-popups allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation'
								referrerPolicy='no-referrer-when-downgrade'
							/>
						</Box>
						<CvContactForm />
					</SimpleGrid>
				</Container>
			</Stack>
		</CvPageLayout>
	)
}

export default ContactPage
