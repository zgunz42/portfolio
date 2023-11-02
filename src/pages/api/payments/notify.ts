/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable prefer-object-has-own */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TransactionStatus } from '@prisma/client'
import { HttpBadRequest, HttpOK } from 'constant'
import type { Files } from 'formidable'
import { Formidable } from 'formidable'
import type IncomingForm from 'formidable/Formidable'
import Joi from 'joi'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
	checkIpayMuTransaction,
	getTransaction,
	proccessOrder
} from 'serverUtils'
import type { IpayMuCallbackResponse } from 'types'

const notifySchema = Joi.object<IpayMuCallbackResponse>({
	trx_id: Joi.string().required(),
	status: Joi.string().required(),
	status_code: Joi.string().required(),
	sid: Joi.string().required(),
	reference_id: Joi.string().required()
})

// set bodyparser
export const config = {
	api: {
		bodyParser: false
	}
}

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const responseError = response.status(HttpBadRequest)
	const data: {
		err: Error
		fields: Record<string, unknown>
		files: Files
	} = await new Promise((resolve, reject) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		const form: IncomingForm = new Formidable()

		form.parse(request, (error_, fields, files) => {
			// eslint-disable-next-line prefer-promise-reject-errors
			if (error_) reject({ err: error_ })
			const recordData: Record<string, unknown> = {}

			for (const [key, value] of Object.entries(fields)) {
				recordData[key] = Array.isArray(value) ? value[0] : value
			}

			resolve({ err: error_, fields: recordData, files })
		})
	})

	if (data.err instanceof Error) {
		responseError.json({ error: `validate error ${data.err.message}` })

		return responseError
	}

	const { error, value } = notifySchema.validate(data.fields)

	if (error) {
		responseError.json({ error: `validate error ${error.message}` })

		return responseError
	}

	try {
		const trxId = Number.parseInt(value.trx_id, 10)
		if (!Number.isInteger(trxId)) {
			throw new TypeError('trx_id must be an integer')
		}
		const transaction = await getTransaction(trxId)
		const successResponse = response.status(HttpOK)
		switch (value.status) {
			case 'berhasil':
				if (transaction.status === TransactionStatus.SUCCESS) {
					throw new Error('transaction already success')
				}

				// eslint-disable-next-line no-case-declarations
				const transactionDetails = await checkIpayMuTransaction(trxId)

				if (transactionDetails.Status === 1) {
					await proccessOrder(trxId)
					// proccess the order
					successResponse.json({
						id: transaction.id,
						trx_id: trxId,
						status: 'berhasil',
						status_code: 'berhasil',
						sid: value.sid,
						reference_id: value.reference_id
					})
				} else {
					successResponse.json({
						id: transaction.id,
						trx_id: trxId,
						status: 'failed',
						status_code: 'failed',
						sid: value.sid,
						reference_id: value.reference_id
					})
				}
				break
			case 'pending':
				successResponse.json({
					id: transaction.id,
					trx_id: trxId,
					status: 'pending',
					status_code: 'pending',
					sid: value.sid,
					reference_id: value.reference_id
				})
				break
			case 'expired':
				successResponse.json({
					id: transaction.id,
					trx_id: trxId,
					status: 'expired',
					status_code: 'expired',
					sid: value.sid,
					reference_id: value.reference_id
				})
				break
			default:
				break
		}

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
