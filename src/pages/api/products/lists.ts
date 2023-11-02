/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable no-case-declarations */
/* eslint-disable prefer-object-has-own */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { BasePrice, HttpInternalServerError, HttpOK } from 'constant'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getProducts } from 'serverUtils'

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	try {
		const { code, status } = request.query

		if (code) {
			if (Array.isArray(status)) {
				throw new TypeError('status must be a string')
			}
			const statusValue = Number.parseInt(status ?? '0', 10)

			const products = await getProducts(String(code), statusValue)

			const successResponse = response.status(HttpOK)

			successResponse.json(
				products.map(({ price, ...properties }) => ({
					...properties,
					price: Number(price) / BasePrice
				}))
			)

			return successResponse
		}
		throw new Error('failed to load data, code required')
	} catch (error) {
		const errorResponse = response.status(HttpInternalServerError)
		if (error instanceof Error) {
			errorResponse.json({ error: error.message })
		} else {
			errorResponse.json({ error: 'failed to load data' })
		}

		return errorResponse
	}
}
