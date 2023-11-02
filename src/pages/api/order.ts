/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable unicorn/no-thenable */
import { HttpBadRequest, HttpOK, HttpUnauthorized } from 'constant'
import Joi from 'joi'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import {
	getPrice,
	getProductByCode,
	getProductOrderByRef,
	getUniqueReferenceId,
	placeProduceOrder
} from 'serverUtils'
import type { ToupRequest } from 'types'
import { authOptions } from './auth/[...nextauth]'

const topUpSchema = Joi.object<ToupRequest>({
	priceType: Joi.string().valid('postpaid', 'prepaid').required(),
	customerId: Joi.when('priceType', {
		is: 'prepaid',
		then: Joi.string().required()
	}),
	productCode: Joi.when('priceType', {
		is: 'prepaid',
		then: Joi.string().required()
	}),
	paymentMethod: Joi.string().required(),
	paymentChannel: Joi.string().required(),
	refId: Joi.when('priceType', {
		is: 'postpaid',
		then: Joi.string().optional().empty()
	}),
	trId: Joi.when('priceType', {
		is: 'postpaid',
		then: Joi.number().required()
	})
})

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const session = await getServerSession(request, response, authOptions)

	if (!session || !session.user || !session.user.email || !session.user.name) {
		const unauthorizedResponse = response.status(HttpUnauthorized)

		unauthorizedResponse.json({ error: 'unauthorized' })

		return unauthorizedResponse
	}

	let data = await request.body

	if (typeof data !== 'object' && typeof data === 'string') {
		data = JSON.parse(data)
	}

	const { error, value } = topUpSchema.validate(data)
	const responseError = response.status(HttpBadRequest)

	if (error) {
		responseError.json({ error: `validate error ${error.message}` })

		return responseError
	}

	try {
		const { operator, ...product } = await getProductByCode(value.productCode)
		const { name, email } = session.user
		const { refId, trId, priceType, paymentChannel, paymentMethod } = value
		let price = getPrice(product.price)

		if (
			priceType === 'postpaid' &&
			product.type === 'POSTPAID' &&
			operator.category.code === 'internet'
		) {
			if (!refId) {
				throw new Error('invalid refId')
			}
			const productOrder = await getProductOrderByRef(refId)
			price = getPrice(productOrder.price) + price
		}

		// create order and transaction
		const result = await placeProduceOrder(
			priceType,
			price,
			product,
			name,
			email,
			!refId || refId === '' ? getUniqueReferenceId() : refId,
			paymentMethod,
			paymentChannel,
			trId,
			[]
		)
		// eslint-disable-next-line no-case-declarations
		const successResponse = response.status(HttpOK)

		successResponse.json(result)

		return successResponse
	} catch (error_) {
		if (error_ instanceof Error) {
			responseError.json({ error: error_.message })
		} else {
			responseError.json({ error: 'unknown error', detail: String(error_) })
		}

		return responseError
	}
}
