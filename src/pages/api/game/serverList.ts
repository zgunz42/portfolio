import type { InquiryGameServerRequest } from '@iak-id/iak-api-server-js'
import { HttpBadRequest, HttpOK, HttpUnauthorized } from 'constant'
import Joi from 'joi'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { inquiryGameServer } from 'serverUtils'
import { authOptions } from '../auth/[...nextauth]'

const inqueryServerSchema = Joi.object<InquiryGameServerRequest>({
	gameCode: Joi.string().required()
})

async function handler(
	request: NextApiRequest,
	response: NextApiResponse
): Promise<unknown> {
	const session = await getServerSession(request, response, authOptions)

	if (!session) {
		const unauthorizedResponse = response.status(HttpUnauthorized)

		unauthorizedResponse.json({ error: 'unauthorized' })

		return unauthorizedResponse
	}

	let data = request.query

	if (typeof data !== 'object' && typeof data === 'string') {
		data = JSON.parse(data)
	}

	const { error, value } = inqueryServerSchema.validate(data)
	const responseError = response.status(HttpBadRequest)

	if (error) {
		responseError.json({ error: `validate error ${error.message}` })

		return responseError
	}

	try {
		const result = await inquiryGameServer(value)

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

export default handler
