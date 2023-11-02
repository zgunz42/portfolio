/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { PostpaidInqueryRequest } from '@iak-id/iak-api-server-js'
import { ProductType } from '@prisma/client'
import { HttpBadRequest, HttpOK, HttpUnauthorized } from 'constant'
import Joi from 'joi'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import {
	createPrepaidInqueryProductOrder,
	getProductByCode,
	getUniqueReferenceId,
	inqueryGameClient,
	inqueryPlnPrepaid,
	inqueryPostpaid
} from 'serverUtils'
import type { InqueryOrder } from 'types'
import gameCodes from 'utils/game/gameCodes'

const inqueryOrderSchema = Joi.object<InqueryOrder>({
	customerId: Joi.string().required(),
	productCode: Joi.string().required(),
	month: Joi.number().optional().empty(),
	nomine: Joi.number().optional().empty(),
	server: Joi.string().optional().empty(),
	gameCode: Joi.number().optional().empty()
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function handler(
	request: NextApiRequest,
	response: NextApiResponse
): Promise<unknown> {
	const session = await getServerSession(request, response, authOptions)

	if (!session || !session.user || !session.user.email) {
		const unauthorizedResponse = response.status(HttpUnauthorized)

		unauthorizedResponse.json({ error: 'unauthorized' })

		return unauthorizedResponse
	}

	let data = await request.body

	if (typeof data !== 'object' && typeof data === 'string') {
		data = JSON.parse(data)
	}

	const { error, value } = inqueryOrderSchema.validate(data)
	const responseError = response.status(HttpBadRequest)

	if (error) {
		responseError.json({ error: `validate error ${error.message}` })

		return responseError
	}
	try {
		const product = await getProductByCode(value.productCode)
		switch (product.type) {
			case ProductType.PREPAID:
				if (product.operator.category.code === 'pln') {
					const result = await inqueryPlnPrepaid({
						customerId: value.customerId
					})

					// eslint-disable-next-line no-case-declarations
					const successResponse = response.status(HttpOK)

					successResponse.json(result)

					return successResponse
				}
				if (product.operator.category.code === 'game') {
					if (!value.gameCode) {
						responseError.json({ error: 'invalid game code' })
						return responseError
					}

					if (!Object.hasOwn(gameCodes, value.gameCode)) {
						responseError.json({ error: 'invalid game code' })
						return responseError
					}

					const baseBuilder = gameCodes[value.gameCode]

					Object.assign(baseBuilder, {
						userId: value.customerId,
						serverId: value.server
					})

					// eslint-disable-next-line no-case-declarations
					const result = await inqueryGameClient(value.gameCode, baseBuilder)

					// eslint-disable-next-line no-case-declarations
					const successResponse = response.status(HttpOK)

					successResponse.json(result)

					return successResponse
				}
				break
			case ProductType.POSTPAID:
				// eslint-disable-next-line no-case-declarations
				const referenceId = getUniqueReferenceId()
				// eslint-disable-next-line no-case-declarations
				const inqueryRequest: PostpaidInqueryRequest = {
					code: value.productCode,
					hp: value.customerId,
					refId: referenceId
				}

				if (value.month || value.nomine) {
					inqueryRequest.desc = {
						amount: value.month ?? value.nomine ?? 0
					}
				}

				// eslint-disable-next-line no-case-declarations
				const result = await inqueryPostpaid(inqueryRequest)

				// eslint-disable-next-line no-case-declarations
				const productOrder = await createPrepaidInqueryProductOrder({
					price: result.price,
					productCode: value.productCode,
					productId: product.id,
					refId: referenceId,
					email: session.user.email,
					trxId: result.tr_id
				})

				// eslint-disable-next-line no-case-declarations
				const successResponse = response.status(HttpOK)

				successResponse.json({
					...result,
					productOrderId: productOrder.id
				})

				return successResponse
			default:
				responseError.json({ error: 'invalid price type' })
				return responseError
		}

		throw new Error('invalid product type')
	} catch (_error) {
		if (_error instanceof Error) {
			responseError.json({ error: _error.message })
		} else {
			responseError.json({ error: 'failed to load postpaid data' })
		}

		return responseError
	}
}

export default handler
