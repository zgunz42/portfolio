/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { PostpaidInqueryData } from '@iak-id/iak-api-server-js'
import type { Product } from '@prisma/client'
import { ProductType } from '@prisma/client'
import type { IPayMuTransactionFee } from 'types'

interface PricingResult {
	price: number
	fee: {
		admin: number
		payment: number
	}
	subtotal: number
}

export default function calcPricing(
	product: Product,
	inquery?: PostpaidInqueryData,
	fee?: IPayMuTransactionFee
): PricingResult {
	let productPriceAmount = 0
	let adminFeeAmount = 0
	let paymentFeeAmount = 0
	let totalPaymentAmount = 0

	if (product.type === ProductType.POSTPAID) {
		productPriceAmount = inquery?.price ?? 0
		adminFeeAmount = Number(product.price)
	}

	if (product.type === ProductType.PREPAID) {
		productPriceAmount = Number(product.price)
	}

	if (fee) {
		if (fee.ActualFeeType !== 'FLAT') {
			paymentFeeAmount =
				(productPriceAmount + adminFeeAmount) * (fee.ActualFee / 100) +
				fee.AdditionalFee
			totalPaymentAmount = paymentFeeAmount + productPriceAmount
		} else {
			paymentFeeAmount = fee.ActualFee + fee.AdditionalFee
			totalPaymentAmount =
				paymentFeeAmount + productPriceAmount + adminFeeAmount
		}
	}

	return {
		fee: {
			admin: adminFeeAmount,
			payment: paymentFeeAmount
		},
		price: productPriceAmount,
		subtotal: totalPaymentAmount
	}
}
