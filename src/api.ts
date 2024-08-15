import supabase from 'client'
import { FirstPage, HttpNotFound } from 'constant'
import fetch from 'cross-fetch'
import LoadMoreError from 'errors/LoadMoreError'
import NotFoundError from 'errors/NotFoundError'

export interface IMetaImage {
	filename: string
	hash: string
	sources: string[]
}

export interface IBlogListItem {
	title: string
	description: string
	publishedAt: Date
	thumbnail: string
	label: string[]
	commentId: number
	readTime: number
	link: string
}

export interface IBaseData {
	publishedAt?: string
	body: string
}

export interface IBlogArticle {
	attributes: Omit<IBlogListItem, 'link'> & {
		commentId: number
	}
	body: string
}

export interface IProjectList {
	name: string
	description: string
	tags: string[]
	pinned: boolean
	thumbnail: string
	demoUrl: string
	createdAt: Date
	sourceUrl: string
	link: string
}

export interface IProject {
	attributes: Omit<IProjectList, 'link'>
	body: string
}
// generated by quicktype
export interface IConfig {
	name: string
	birthdate: Date
	avatar: string
	background: string
	jargon: string
	github: string
	repository: string
	quote: string
	email: string
	phone: string
	fullName: string
	contact: Contact
	skills: IConfigSkill[]
	about: About
}

export interface About {
	intro: string
	jobExperiences: JobExperience[]
	educations: Education[]
	languages: Language[]
	hobby: string[]
	skills: AboutSkill[]
	tools: Tool[]
}

export interface Education {
	type: string
	name: string
	startAt: Date
	graduationAt: Date
	location: string
	description: string
}

export interface JobExperience {
	company: string
	location: string
	position: string
	startAt: Date
	endAt?: Date
	description: string
}

export interface Language {
	name: string
	level: string
}

export interface AboutSkill {
	icon: string
	group?: string
	name: string
	level: number
}

export interface Tool {
	icon: string
	name: string
	hasColor?: boolean
}

export interface Contact {
	address: string
	phone: string
	email: string
	github: string
	instagram: string
	linkedin: string
}

export interface IConfigSkill {
	name: string
	techs: string[]
}

// end generated type
export enum Subject {
	JobOffer = 'JobOffer',
	Project = 'Project',
	Freelance = 'Freelance'
}

export interface ScheduleData {
	email: string
	phone: string
	fullname: string
	company?: string
	subject: Subject
	message: string
	meet_date: string
	duration: number
}
export interface Schedule extends ScheduleData {
	id: string
	created_at: string
}

export async function getConfig(language: string): Promise<IConfig> {
	const result = await fetch(`/_data/${language}/config.json`)
	if (result.status === HttpNotFound) {
		throw new NotFoundError('page not found')
	}
	const config = (await result.json()) as IConfig

	return config
}

export async function getPinnedProjects(
	language: string
): Promise<IProjectList[]> {
	const result = await fetch(`/_data/${language}/projects/index-pinned.json`)
	if (result.status === HttpNotFound) {
		throw new NotFoundError("requested file doesn't exist")
	}
	const projectList: IProjectList[] = (await result.json()) as IProjectList[]
	return projectList.map(data => ({
		...data,
		createdAt: new Date(String(data.createdAt))
	}))
}

export async function getProjectListPaged(
	page: number,
	language: string
): Promise<IProjectList[]> {
	const result = await fetch(
		`/_data/${language}/projects/index-page-${page}.json`
	)

	if (result.status === HttpNotFound && page > FirstPage) {
		throw new LoadMoreError('Project not found')
	}

	const projectList: IProjectList[] = (await result.json()) as IProjectList[]
	return projectList.map(data => ({
		...data,
		createdAt: new Date(String(data.createdAt))
	}))
}

export async function getBlogListPaged(
	page: number,
	language: string
): Promise<IBlogListItem[]> {
	const result = await fetch(
		`/_data/${language}/articles/index-page-${page}.json`
	)

	if (result.status === HttpNotFound && page > FirstPage) {
		throw new LoadMoreError('Articles not found')
	}

	const blogList: IBlogListItem[] = (await result.json()) as IBlogListItem[]
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return blogList.map(data => ({
		...data,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		publishedAt: new Date(String(data.publishedAt))
	}))
}

export async function getBlogArticle(
	slug: string,
	language: string
): Promise<IBlogArticle> {
	const result = await fetch(`/_data/${language}/articles/${slug}.json`)

	if (result.status === HttpNotFound) {
		throw new Error('Article not found')
	}

	const article: IBlogArticle = (await result.json()) as IBlogArticle
	return {
		attributes: {
			...article.attributes,
			publishedAt: new Date(String(article.attributes.publishedAt))
		},
		body: article.body
	}
}

export async function getProjectDetail(
	slug: string,
	language: string
): Promise<IProject> {
	const result = await fetch(`/_data/${language}/projects/${slug}.json`)

	if (result.status === HttpNotFound) {
		throw new Error('Article not found')
	}

	const project: IProject = (await result.json()) as IProject
	return {
		attributes: project.attributes,
		body: project.body
	}
}

export async function addSchedule(schedule: ScheduleData): Promise<Schedule> {
	const { data, error } = await supabase.from<Schedule>('schedules').insert([
		{
			company: schedule.company,
			email: schedule.email,
			fullname: schedule.fullname,
			message: schedule.message,
			meet_date: schedule.meet_date,
			phone: schedule.phone,
			duration: schedule.duration,
			subject: schedule.subject
		}
	])
	if (error) {
		console.log(error)
		throw new Error(error.message)
	}

	return data[0]
}
