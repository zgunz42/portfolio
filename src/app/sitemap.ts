/* eslint-disable @typescript-eslint/no-magic-numbers */
import { getArticleList, getProjectList } from 'api'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
	const articleItems = await getArticleList('id-ID')
	const projectItems = await getProjectList('id-ID')
	const articleLinks = articleItems.map<MetadataRoute.Sitemap[0]>(item => ({
		url: `${baseUrl}/blogs/${item.link}`,
		lastModified: item.publishedAt,
		changeFrequency: 'weekly',
		priority: 1
	}))
	const projectLinks = projectItems.map<MetadataRoute.Sitemap[1]>(item => ({
		url: `${baseUrl}/projects/${item.link}`,
		lastModified: item.createdAt,
		changeFrequency: 'monthly',
		priority: 2
	}))

	return [...articleLinks, ...projectLinks]
}
