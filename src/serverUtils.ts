/* eslint-disable import/prefer-default-export */
import type {
	Credential,
	PriceListData,
	PricelistInQuery
} from '@iak-id/iak-api-server-js'
import { IAKPrepaid } from '@iak-id/iak-api-server-js'
import { HttpOK } from 'constant'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function initIAKPrepaid(credential: Credential): IAKPrepaid {
	const prepaid = new IAKPrepaid(credential)
	return prepaid
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// function initIAKPostpaid(credential: Credential): IAKPostpaid {
// 	const prepaid = new IAKPostpaid(credential)
// 	return prepaid
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function initCredential(): Credential {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { IAK_USERNAME, IAK_STAGE, IAK_API_KEY } = process.env

	if (IAK_USERNAME && IAK_STAGE && IAK_API_KEY) {
		if (IAK_STAGE !== 'production' && IAK_STAGE !== 'sandbox') {
			throw new Error('Please set IAK_STAGE to production or sandbox')
		}

		const credential: Credential = {
			userHp: IAK_USERNAME,
			stage: IAK_STAGE,
			apiKey: IAK_API_KEY
		}

		return credential
	}

	throw new Error('Please set IAK_USERNAME, IAK_STAGE and IAK_API_KEY')
}

export async function getProductList(
	query?: PricelistInQuery
): Promise<PriceListData> {
	const client = initIAKPrepaid(initCredential())
	const result = await client.pricelist(query)
	console.log(result.code, result.status)

	if (result.code !== HttpOK) {
		throw new Error(result.status)
	}

	return result.data
}
