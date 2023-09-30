export default class LoadMoreError extends Error {
	public constructor(message: string) {
		super(message)
		this.name = 'LoadMoreError'
	}
}
