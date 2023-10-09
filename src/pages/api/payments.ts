/* eslint-disable prefer-object-has-own */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
	HttpOK,
	HttpBadRequest,
	HttpInternalServerError,
	HttpUnauthorized
} from 'constant'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getListPayment } from 'serverUtils'

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	if (request.method !== 'GET') {
		response.status(HttpBadRequest).json({
			error: 'unsupported method'
		})
	} else {
		try {
			const data = (await getListPayment()) as { Status: number }

			if (
				Object.prototype.hasOwnProperty.call(data, 'Status') &&
				data.Status === HttpUnauthorized
			) {
				throw new Error('unauthorized')
			}

			response.status(HttpOK).json(data)
		} catch {
			response
				.status(HttpInternalServerError)
				.json({ error: 'failed to load data' })
		}
	}
}
