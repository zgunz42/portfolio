/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpInternalServerError, HttpOK } from 'constant'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getProductList } from 'serverUtils'

export default async function handler(
	_: NextApiRequest,
	response: NextApiResponse
) {
	try {
		const result = await getProductList()
		response.status(HttpOK).json({ result })
	} catch {
		response
			.status(HttpInternalServerError)
			.json({ error: 'failed to load data' })
	}
}
