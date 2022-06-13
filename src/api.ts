import type { GithubRepository } from 'models/githubRepository'
import type GithubUser from 'models/githubUser'
import { fromJSON } from 'models/githubUser'

// eslint-disable-next-line import/prefer-default-export
export const getGithubUser = async (username: string): Promise<GithubUser> => {
	const result = await fetch(`https://api.github.com/users/${username}`)

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const json = await result.json()

	return fromJSON(json)
}
const initialPage = 1
const itemInPagePage = 30
export async function getGithubRepositories(
	user: string,
	page = initialPage,
	perPage = itemInPagePage
): Promise<GithubRepository[]> {
	try {
		const response = await fetch(
			`https://api.github.com/users/${user}/repos?page=${page}&per_page=${perPage}`
		)

		const httpOkStatus = 200
		if (response.status !== httpOkStatus) {
			throw new Error('Something went wrong')
		}

		return await (response.json() as Promise<GithubRepository[]>)
	} catch (error) {
		console.log(error)
		throw error
	}
}
