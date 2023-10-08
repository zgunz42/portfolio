/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
	BackgroundImage,
	Box,
	Button,
	Container,
	Group,
	Image,
	Text,
	Title
} from '@mantine/core'
import useLocale from 'hooks/useLocale'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { FileDownload as FileDownloadIcon } from 'tabler-icons-react'
import classes from './CvHero.module.css'
import CvProfileAvatar from './CvProfileAvatar'

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
	const router = useRouter()
	const { $t } = useLocale()
	const onToCv = (): void => {
		router
			.push('/download-cv')
			.then(() => {})
			.catch(error => {
				console.error(error)
			})
	}
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
							<Box
								mt={30}
								gap='sm'
								align='center'
								className={classes['info-group']}
							>
								<Image
									src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${github}&layout=compact&text_color=1C7ED6&title_color=1C7ED6&bg_color=141321&count_private=true&include_all_commits=true&langs_count=10&hide_title=true`}
									alt='github status'
									className='w-full'
									style={{
										minHeight: 207
									}}
									fallbackSrc='https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png'
									width={600}
									height={400}
								/>
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
							</Box>

							<Group mt={30} className={classes['cta-btn']}>
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
									gradient={{ from: 'indigo', to: 'cyan', deg: 35 }}
									radius='xl'
									onClick={onToCv}
									size='md'
									leftSection={<FileDownloadIcon />}
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
