/* eslint-disable prefer-object-has-own */
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
		const knownLabels = new Set([
			'voucher',
			'data',
			'pln',
			'game',
			'etoll',
			'pulsa',
			'streaming',
			'emeterai'
		])

		const indexs = {} as Record<string, Record<string, string[]>>

		for (const item of result.pricelist) {
			let label = item.product_type
			if (!knownLabels.has(item.product_type)) {
				label = 'international'
			}
			if (!Object.prototype.hasOwnProperty.call(indexs, label)) {
				indexs[label] = {}
			}

			const itemKey =
				label !== item.product_type
					? item.product_type
					: item.product_description
			if (!Object.prototype.hasOwnProperty.call(indexs[label], itemKey)) {
				indexs[label][itemKey] = []
			}

			indexs[label][itemKey].push(item.product_code)
		}

		response.status(HttpOK).json({
			indexs,
			pricelist: result.pricelist
		})
	} catch {
		response
			.status(HttpInternalServerError)
			.json({ error: 'failed to load data' })
	}
}
