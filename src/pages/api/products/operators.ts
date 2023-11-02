/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpInternalServerError, HttpOK } from 'constant'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getOperators } from 'serverUtils'

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	try {
		const { code } = request.query

		if (code) {
			const categories = await getOperators(String(code))

			const successResponse = response.status(HttpOK)

			successResponse.json(categories)
			return successResponse
		}
		throw new Error('failed to load data, code required')
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
