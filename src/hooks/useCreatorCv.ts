/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQueries } from '@tanstack/react-query'
import { getConfig, getPinnedProjects } from 'api'
import type { CVProperties } from 'cvUtils'
import { Language, createCVPdf } from 'cvUtils'
import { saveAs } from 'file-saver'
import { useCallback, useEffect, useState } from 'react'
import useLocale from './useLocale'

const MaxProgress = 100

interface CreateCV {
	progress: number
	isError: boolean
	isLoading: boolean
	createCV: () => Promise<void>
}

export default function useCreatorCv(): CreateCV {
	const { locale } = useLocale()
	const [progress, setProgress] = useState(0)
	const [config, project] = useQueries({
		queries: [
			{
				queryKey: ['config', locale],
				queryFn: getConfig.bind(undefined, locale),
				onSuccess: (): void => {
					// eslint-disable-next-line @typescript-eslint/no-magic-numbers
					setProgress(50)
				}
			},
			{
				queryKey: ['pinProject', locale],
				queryFn: getPinnedProjects.bind(undefined, locale),
				onSuccess: (): void => {
					// eslint-disable-next-line @typescript-eslint/no-magic-numbers
					setProgress(75)
				}
			}
		]
	})

	const [cv, setCV] = useState<CVProperties>()

	const createCV = useCallback(async () => {
		if (cv !== undefined) {
			const cvPdfData = await createCVPdf(
				cv,
				locale === 'en-US' ? Language.EN : Language.ID
			)
			// save Uint8Array as pdf File
			const blob = new Blob([cvPdfData], { type: 'application/pdf' })
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			saveAs(blob, `${cv.name} ${new Date().toLocaleDateString()}.pdf`)
		}
	}, [cv, locale])

	useEffect(() => {
		if (config.data !== undefined && project.data !== undefined) {
			const cvData: CVProperties = {
				avatar: config.data.avatar,
				name: config.data.fullName,
				background: config.data.background,
				birthdate: new Date(config.data.birthdate),
				contact: config.data.contact,
				jargon: config.data.jargon,
				educations: config.data.about.educations.map(education => ({
					...education,
					startAt: new Date(education.startAt),
					graduationAt: new Date(education.graduationAt)
				})),
				jobExperience: config.data.about.jobExperiences.map(jobExperience => ({
					...jobExperience,
					startAt: new Date(jobExperience.startAt),
					endAt: new Date(jobExperience.endAt)
				})),
				projects: project.data.map(item => ({
					...item,
					subtitle: item.tags.join(', '),
					link: item.demoUrl
				})),
				skills: config.data.skills,
				spokenLanguages: config.data.about.languages
			}
			setCV(cvData)
			setProgress(MaxProgress)
		}
	}, [config.data, project.data])

	return {
		progress,
		isError: config.isError || project.isError,
		isLoading: config.isLoading || project.isLoading,
		createCV
	}
}
