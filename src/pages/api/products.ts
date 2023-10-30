/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable no-case-declarations */
/* eslint-disable prefer-object-has-own */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { IPriceListApiResult, ProductList } from 'api'
import { HttpInternalServerError, HttpOK } from 'constant'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getPostpaidProductList, getPrepaidProductList } from 'serverUtils'

async function handlePrepaid(): Promise<IPriceListApiResult> {
	try {
		const result = await getPrepaidProductList()
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

		return {
			indexs,
			pricelist: result.pricelist.map(item => ({
				...item,
				kind: 'prepaid'
			}))
		} as IPriceListApiResult
	} catch {
		throw new Error('failed to load prepaid data')
	}
}

async function handlePostpaid(): Promise<IPriceListApiResult> {
	try {
		const result = await getPostpaidProductList()

		const indexs = {} as Record<string, Record<string, string[]>>

		for (const item of result.pasca) {
			const label = item.type

			if (!Object.prototype.hasOwnProperty.call(indexs, label)) {
				indexs[label] = {}
			}

			if (!Object.prototype.hasOwnProperty.call(indexs[label], item.name)) {
				indexs[label][item.name] = []
			}

			indexs[label][item.name].push(item.code)
		}

		return {
			indexs,
			pricelist: result.pasca.map(
				item =>
					({
						product_code: item.code,
						product_type: item.type,
						product_details: item.name,
						product_price: item.fee > item.komisi ? item.fee - item.komisi : 0,
						product_description: item.name,
						icon_url: '',
						product_nominal: item.name,
						kind: 'postpaid',
						product_category: item.category,
						status: item.status === 1 ? 'active' : 'non active'
					} as ProductList)
			)
		} as IPriceListApiResult
	} catch {
		throw new Error('failed to load postpaid data')
	}
}

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const kind = request.query.kind as string

	try {
		let content: IPriceListApiResult
		switch (kind) {
			case 'prepaid':
				content = await handlePrepaid()

				break
			case 'postpaid':
				content = await handlePostpaid()
				break
			default:
				const prepaid = await handlePrepaid()
				const postPaid = await handlePostpaid()
				const keys = new Set([
					...Object.keys(prepaid.indexs),
					...Object.keys(postPaid.indexs)
				])

				const indexs = {} as Record<string, Record<string, string[]>>

				for (const key of keys) {
					indexs[key] = {
						...prepaid.indexs[key],
						...postPaid.indexs[key]
					}
				}

				content = {
					indexs,
					pricelist: [...prepaid.pricelist, ...postPaid.pricelist]
				}
				break
		}

		const successResponse = response.status(HttpOK)
		successResponse.json(content)
		return successResponse
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
