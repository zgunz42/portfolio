/* eslint-disable prefer-object-has-own */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpBadRequest } from 'constant'
import type { NextApiRequest, NextApiResponse } from 'next'
import { checkIpayMuTransaction } from 'serverUtils'

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const { transId } = request.query
	const responseError = response.status(HttpBadRequest)

	if (!transId || Array.isArray(transId)) {
		responseError.json({ error: 'transId is required' })
		return responseError
	}

	try {
		const code = Number.parseInt(transId, 10)

		if (!Number.isInteger(code)) {
			throw new TypeError('transId must be an integer')
		}

		const data = await checkIpayMuTransaction(code)
		const successResponse = response.status(HttpBadRequest)
		successResponse.json(data)
		return successResponse
	} catch (_error) {
		if (_error instanceof Error) {
			responseError.json({ error: _error.message })
		} else {
			responseError.json({ error: 'failed to load data' })
		}

		return responseError
	}
}
