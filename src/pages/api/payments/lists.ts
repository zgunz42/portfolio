/* eslint-disable prefer-object-has-own */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpInternalServerError, HttpOK } from 'constant'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getListPayment } from 'serverUtils'

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	try {
		const data = await getListPayment()

		const successResponse = response.status(HttpOK)
		successResponse.json(data)
		return successResponse
	} catch (error_) {
		const errorResponse = response.status(HttpInternalServerError)
		if (error_ instanceof Error) {
			errorResponse.json({ error: error_.message })
		} else {
			errorResponse.json({ error: 'failed to load data' })
		}

		return errorResponse
	}
}
