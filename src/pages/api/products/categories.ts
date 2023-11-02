/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpInternalServerError, HttpOK } from 'constant'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getCategories } from 'serverUtils'

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	try {
		const categories = await getCategories()

		const successResponse = response.status(HttpOK)

		successResponse.json(categories)

		return successResponse
	} catch (error) {
		const errorResponse = response.status(HttpInternalServerError)

		if (error instanceof Error) {
			errorResponse.json({ error: error.message })
		} else {
			errorResponse.json({ error: 'failed to load data', stack: String(error) })
		}

		return errorResponse
	}
}
