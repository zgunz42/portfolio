/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable import/prefer-default-export */
import type {
	Credential,
	PriceListData,
	PricelistInQuery
} from '@iak-id/iak-api-server-js'
import { IAKPrepaid } from '@iak-id/iak-api-server-js'
import type { User } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { HttpOK } from 'constant'
import CryptoJS from 'crypto-js'

const saltRounds = 11
const prismaClient = new PrismaClient()

interface RegisterData {
	name: string
	email: string
	password: string
}

export function timestamp(): string {
	// Format YYYYMMDDhhmmss
	const now = new Date()

	const year = now.getFullYear().toString().padStart(4, '0')
	const month = (now.getMonth() + 1).toString().padStart(2, '0')
	const day = now.getDate().toString().padStart(2, '0')
	const hours = now.getHours().toString().padStart(2, '0')
	const minutes = now.getMinutes().toString().padStart(2, '0')
	const seconds = now.getSeconds().toString().padStart(2, '0')

	return year + month + day + hours + minutes + seconds
}

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

	if (result.code !== HttpOK) {
		throw new Error(result.status)
	}

	return result.data
}

const apikey = process.env.IPAYMU_API_KEY
const va = process.env.IPAYMU_VA
const indexPaymuEndpoint = process.env.IPAYMU_URL

export function signPost(bodyRequest: FormData): string {
	if (!apikey || !va) {
		throw new Error('Please set IPAYMU_API_KEY, IPAYMU_VA and IPAYMU_URL')
	}

	const bodyEncrypt = CryptoJS.SHA256(JSON.stringify(bodyRequest))
	const stringtosign = `POST:${va}:${bodyEncrypt}:${apikey}`
	const signature = CryptoJS.enc.Hex.stringify(
		CryptoJS.HmacSHA256(stringtosign, apikey)
	)
	return signature
}

export function signGet(): string {
	if (!apikey || !va) {
		throw new Error('Please set IPAYMU_API_KEY, IPAYMU_VA and IPAYMU_URL')
	}
	const bodyEncrypt = CryptoJS.SHA256(JSON.stringify({}))
	const stringtosign = `GET:${va}:${bodyEncrypt}:${apikey}`
	const signature = CryptoJS.enc.Hex.stringify(
		CryptoJS.HmacSHA256(stringtosign, apikey)
	)
	return signature
}

export async function getListPayment(): Promise<unknown> {
	const url = `${indexPaymuEndpoint}/payment-method-list`
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			va,
			signature: signGet(),
			timestamp: timestamp()
		} as Record<string, string>
	})

	return response.json()
}

// export async function submitOrder(
// 	productCode: string,
// 	paymentChannel: string
// ): Promise<unknown> {}

export function hashPassword(password: string): string {
	return bcrypt.hashSync(password, saltRounds)
}

export function comparePassword(password: string, hash: string): boolean {
	return bcrypt.compareSync(password, hash)
}

export async function createUser(data: RegisterData): Promise<User> {
	await prismaClient.$connect()
	const user = await prismaClient.user.create({
		data
	})

	return user
}

export async function getUserByEmail(email: string): Promise<User | null> {
	await prismaClient.$connect()
	const user = await prismaClient.user.findUnique({
		where: {
			email
		}
	})

	return user
}
