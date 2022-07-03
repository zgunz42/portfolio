/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
	Box,
	Button,
	Container,
	createStyles,
	Group,
	Image,
	Stack,
	Text,
	Title,
	TypographyStylesProvider
} from '@mantine/core'
import { getProjectDetail } from 'api'
import CvPageLayout from 'components/CvPageLayout'
import LoadingOrError from 'components/LoadingOrError'
import NotFoundError from 'errors/NotFoundError'
import useLocale from 'hooks/useLocale'
import type { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import ReactMarkdown from 'react-markdown'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

const useStyle = createStyles(() => ({
	articleBody: {
		letterSpacing: '0.01em',
		lineHeight: '1.5em'
	},
	wrapper: {
		margin: '0 auto',
		padding: '0 1em',
		maxWidth: '800px'
	}
}))

function ProjectDetailPage(): ReactElement {
	const { classes } = useStyle()
	const { projectSlug } = useParams()
	const { $t, locale } = useLocale()
	const navigate = useNavigate()
	const { data } = useQuery(
		['project', { projectSlug, locale }],
		async (): ReturnType<typeof getProjectDetail> => {
			if (!projectSlug) {
				throw new NotFoundError('Project slug is required')
			}
			return getProjectDetail(projectSlug, locale)
		},
		{
			onError(error) {
				if (error instanceof NotFoundError) {
					navigate('/404')
				}
			}
		}
	)
	if (!data) {
		return <LoadingOrError />
	}
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	return (
		<CvPageLayout>
			<Stack className={classes.wrapper}>
				<Helmet>
					<title>{data.attributes.name} | I Kadek Adi Gunawan</title>
				</Helmet>
				<Container>
					<TypographyStylesProvider>
						<Title>{data.attributes.name}</Title>
						<Text className='mt-4'>{data.attributes.description}</Text>
					</TypographyStylesProvider>
					<Box className='mt-8 mb-12 h-72 w-full overflow-hidden rounded-md text-right'>
						<Image
							className=' h-72 w-full object-cover'
							src={data.attributes.thumbnail}
							withPlaceholder
						/>
					</Box>
					<Group spacing={8} className='mt-8 mb-12'>
						<Button>
							<a
								href={data.attributes.demoUrl}
								target='_blank'
								rel='noreferrer'
							>
								{$t('project.button.demo')}
							</a>
						</Button>
						<Button variant='light'>
							<a
								href={data.attributes.sourceUrl}
								target='_blank'
								rel='noreferrer'
							>
								{$t('project.button.source')}
							</a>
						</Button>
					</Group>
					<TypographyStylesProvider>
						<article className={classes.articleBody}>
							<ReactMarkdown unwrapDisallowed>{data.body}</ReactMarkdown>
						</article>
					</TypographyStylesProvider>
				</Container>
			</Stack>
		</CvPageLayout>
	)
}

export default ProjectDetailPage
