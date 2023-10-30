/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable unicorn/no-thenable */
import { HttpBadRequest, HttpOK, HttpUnauthorized } from 'constant'
import Joi from 'joi'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { directPay } from 'serverUtils'
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
	refId: Joi.when('priceType', {
		is: 'postpaid',
		then: Joi.string().required()
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

	if (!session) {
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
		if (value.priceType === 'prepaid') {
			// create order and transaction
			const result = await directPay({
				amount: 10_000,
				email: session.user?.email ?? 'adi_gunawan@live.com',
				name: session.user?.name ?? 'Adi Gunawan',
				phone: '081234567890',
				notifyUrl: 'https://example.com',
				paymentChannel: 'bca',
				paymentMethod: 'va'
			})

			// eslint-disable-next-line no-case-declarations
			const successResponse = response.status(HttpOK)

			successResponse.json(result)

			return successResponse
		}
		throw new Error('invalid price type')
	} catch (error_) {
		if (error_ instanceof Error) {
			responseError.json({ error: error_.message })
		} else {
			responseError.json({ error: 'unknown error', detail: String(error_) })
		}

		return responseError
	}
}
