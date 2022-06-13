/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
interface GithubUser {
	login: string
	id: number
	nodeID: string
	avatarURL: string
	gravatarID: string
	url: string
	htmlURL: string
	followersURL: string
	followingURL: string
	gistsURL: string
	starredURL: string
	subscriptionsURL: string
	organizationsURL: string
	reposURL: string
	eventsURL: string
	receivedEventsURL: string
	type: string
	siteAdmin: boolean
	name: string
	company: string
	blog: string
	location: string
	email: null
	hireable: boolean
	bio: string
	twitterUsername: string
	publicRepos: number
	publicGists: number
	followers: number
	following: number
	createdAt: Date
	updatedAt: Date
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fromJSON = (json: any): GithubUser => ({
	login: json.login,
	id: json.id,
	nodeID: json.node_id,
	avatarURL: json.avatar_url,
	gravatarID: json.gravatar_id,
	url: json.url,
	htmlURL: json.html_url,
	followersURL: json.followers_url,
	followingURL: json.following_url,
	gistsURL: json.gists_url,
	starredURL: json.starred_url,
	subscriptionsURL: json.subscriptions_url,
	organizationsURL: json.organizations_url,
	reposURL: json.repos_url,
	eventsURL: json.events_url,
	receivedEventsURL: json.received_events_url,
	type: json.type,
	siteAdmin: json.site_admin,
	name: json.name,
	company: json.company,
	blog: json.blog,
	location: json.location,
	email: json.email,
	hireable: json.hireable,
	bio: json.bio,
	twitterUsername: json.twitter_username,
	publicRepos: json.public_repos,
	publicGists: json.public_gists,
	followers: json.followers,
	following: json.following,
	createdAt: new Date(String(json.created_at)),
	updatedAt: new Date(String(json.updated_at))
})

export default GithubUser
