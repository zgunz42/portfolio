/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable import/prefer-default-export */
import type {
	Credential,
	InquiryGameIdData,
	InquiryGameServer,
	InquiryGameServerRequest,
	InquiryPlnData,
	InquiryPlnRequest,
	PostpaidInqueryData,
	PostpaidInqueryRequest,
	PostPaidPriceListQuery,
	PostPiadPriceListData,
	PriceListData,
	PricelistInQuery,
	TopUpPrepaidData,
	TopUpPrepaidRequest
} from '@iak-id/iak-api-server-js'
import { IAKPostpaid, IAKPrepaid } from '@iak-id/iak-api-server-js'
import type {
	Operator as ProductOperator,
	Prisma,
	Product,
	ProductCategory,
	ProductOrder,
	ProductOrderFee,
	User
} from '@prisma/client'
import {
	OrderStatus,
	PrismaClient,
	ProductStatus,
	TransactionStatus,
	TransactionType
} from '@prisma/client'
import type { Optional } from '@prisma/client/runtime/library'
import bcrypt from 'bcrypt'
import CryptoJS from 'crypto-js'
import short from 'short-uuid'
import type {
	IpayMuDatum,
	IpayMuDirectPayData,
	IpayMuDirectPayRequest,
	IpayMuDirectPayResponse,
	IPayMuPaymetListResponse,
	PrismaTx
} from 'types'
import type GameIdBuilder from 'utils/game/builder'
import { BasePrice, HttpOK } from './constant'

const saltRounds = 11
export const prismaClient = new PrismaClient()

interface RegisterData {
	name: string
	email: string
	password: string
}

export function toMoney(price: number): bigint {
	return BigInt(price * BasePrice)
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
function initIAKPostpaid(credential: Credential): IAKPostpaid {
	const prepaid = new IAKPostpaid(credential)
	return prepaid
}

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

export async function getPostpaidProductList(
	query?: PostPaidPriceListQuery
): Promise<PostPiadPriceListData> {
	const client = initIAKPostpaid(initCredential())
	const result = await client.pricelist(query)
	if (result.data.message !== 'SUCCESS') {
		throw new Error(result.data.message)
	}

	return result.data
}

export async function getPrepaidProductList(
	query?: PricelistInQuery
): Promise<PriceListData> {
	const client = initIAKPrepaid(initCredential())
	const result = await client.pricelist(query)

	if (result.code !== HttpOK) {
		throw new Error(result.status)
	}

	return result.data
}

export async function inqueryPostpaid(
	query: PostpaidInqueryRequest
): Promise<PostpaidInqueryData> {
	const client = initIAKPostpaid(initCredential())
	const result = await client.inquiry(query)
	if (result.code !== HttpOK) {
		throw new Error(result.status)
	}

	return result.data
}

export async function inqueryPlnPrepaid(
	query: InquiryPlnRequest
): Promise<InquiryPlnData> {
	const client = initIAKPrepaid(initCredential())
	const result = await client.inquiryPln(query)

	if (result.code !== HttpOK) {
		throw new Error(result.status)
	}

	return result.data
}

export async function inqueryGameClient(
	gameCode: number,
	gameIdBuilder: GameIdBuilder
): Promise<InquiryGameIdData> {
	const client = initIAKPrepaid(initCredential())
	const customerId = gameIdBuilder.build()
	// TODO: broken by IAK
	const result = await client.inquiryGameId({
		customerId,
		gameCode
	})

	if (result.code !== HttpOK) {
		throw new Error(result.status)
	}

	return result.data
}

export async function inquiryGameServer(
	quiry: InquiryGameServerRequest
): Promise<InquiryGameServer[]> {
	const client = initIAKPrepaid(initCredential())
	const result = await client.inquiryGameServer(quiry)

	if (result.code !== HttpOK) {
		throw new Error(result.status)
	}

	return result.data.servers
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

export async function directPay(
	input: IpayMuDirectPayRequest
): Promise<IpayMuDirectPayData> {
	const url = `${indexPaymuEndpoint}/payment/direct`
	const formData = new FormData()

	// eslint-disable-next-line @typescript-eslint/no-for-in-array, no-restricted-syntax
	for (const key of Object.keys(input)) {
		if (Object.hasOwn(input, key)) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			formData.append(
				key,
				input[key as keyof IpayMuDirectPayRequest] as unknown as string
			)
		}
	}

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			// Accept: 'application/json',
			// 'Content-Type': 'multipart/form-data',
			va,
			signature: signPost(formData),
			timestamp: timestamp()
		} as Record<string, string>,
		body: formData
	})

	const data = (await response.json()) as IpayMuDirectPayResponse

	if (data.Status !== HttpOK) {
		throw new Error(data.Message)
	}

	data.Data.Expired = new Date(data.Data.Expired)

	return data.Data
}

export async function getListPayment(): Promise<IpayMuDatum[]> {
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

	const data = (await response.json()) as IPayMuPaymetListResponse

	if (!data.Success) {
		throw new Error(data.Message)
	}

	return data.Data
}

export async function topUp(
	input: TopUpPrepaidRequest
): Promise<TopUpPrepaidData> {
	const client = initIAKPrepaid(initCredential())
	const result = await client.topUp(input)

	if (result.code !== HttpOK) {
		throw new Error(result.status)
	}

	return result.data
}

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

export function getUniqueReferenceId(): string {
	return short.generate()
}

export async function getCategories(): Promise<ProductCategory[]> {
	await prismaClient.$connect()
	try {
		const categories = await prismaClient.productCategory.findMany({})

		return categories
	} finally {
		await prismaClient.$disconnect()
	}
}

export async function getOperators(
	categoryCode: string
): Promise<ProductOperator[]> {
	await prismaClient.$connect()
	try {
		const operators = await prismaClient.operator.findMany({
			where: {
				category: {
					code: categoryCode
				}
			}
		})

		return operators
	} finally {
		await prismaClient.$disconnect()
	}
}

export async function getProductByCode(code: string): Promise<
	Prisma.ProductGetPayload<{
		include: {
			operator: {
				include: {
					category: true
				}
			}
		}
	}>
> {
	await prismaClient.$connect()
	try {
		const product = await prismaClient.product.findUniqueOrThrow({
			where: {
				code
			},
			include: {
				operator: {
					include: {
						category: true
					}
				}
			}
		})

		return product
	} finally {
		await prismaClient.$disconnect()
	}
}

export async function getProducts(
	providerCode: string,
	status = 0
): Promise<Product[]> {
	await prismaClient.$connect()
	try {
		const products = await prismaClient.product.findMany({
			where: {
				operator: {
					code: providerCode
				},
				status: {
					equals:
						status > 0
							? // eslint-disable-next-line unicorn/no-nested-ternary
							  status > 1
								? ProductStatus.INACTIVE
								: ProductStatus.ACTIVE
							: undefined
				}
			}
		})
		return products
	} finally {
		await prismaClient.$disconnect()
	}
}

export async function createPrepaidInqueryProductOrder({
	price,
	productId,
	productCode,
	refId,
	email,
	fee,
	status,
	transactionId,
	trxId,
	tx
}: Optional<
	Omit<
		Prisma.ProductOrderCreateInput,
		'coupon' | 'product' | 'transaction' | 'user'
	>,
	| 'createdDate'
	| 'fee'
	| 'productOrderFee'
	| 'status'
	| 'transaction'
	| 'updatedDate'
> & {
	productId: number
	email: string
	transactionId?: number
	trxId?: number
	tx?: PrismaTx
}): Promise<ProductOrder> {
	const client = tx ?? prismaClient
	if (!tx) {
		await prismaClient.$connect()
	}
	try {
		const order = await client.productOrder.create({
			data: {
				refId,
				fee: fee ?? 0,
				trxId,
				price: toMoney(price as number),
				product: {
					connect: {
						id: productId
					}
				},
				productCode,
				status: status ?? OrderStatus.INQUIRY,
				user: {
					connect: {
						email
					}
				},
				transaction: transactionId
					? { connect: { id: transactionId } }
					: undefined
			}
		})

		return order
	} finally {
		if (!tx) {
			await prismaClient.$disconnect()
		}
	}
}

export async function placeProduceOrder(
	type: 'postpaid' | 'prepaid',
	price: number,
	product: Product,
	userName: string,
	email: string,
	referenceId: string,
	paymentMethod: string,
	paymentChannel: string,
	trxId: number | undefined,
	fees: Pick<ProductOrderFee, 'addition' | 'amount' | 'source' | 'type'>[]
): Promise<IpayMuDirectPayData> {
	await prismaClient.$connect()
	try {
		const payment = await directPay({
			amount: price,
			paymentMethod: paymentMethod as 'cc',
			paymentChannel,
			email,
			name: userName,
			feeDirection: 'BUYER',
			notifyUrl: process.env.IPAYMU_CALLBACK_URL ?? '',
			referenceId,
			phone: process.env.IPAYMU_PHONE_NUMBER ?? '',
			product: [product.name],
			price: [Number(product.price) / BasePrice]
		})

		const resultTr = await prismaClient.$transaction<IpayMuDirectPayData>(
			async tx => {
				const transaction = await tx.transaction.create({
					data: {
						referenceId: String(payment.TransactionId),
						amount: payment.Total * BasePrice,
						expiredDate: payment.Expired,
						status: TransactionStatus.PENDING,
						type: TransactionType.GATEWAYS,
						productCode: product.code,
						paymentNo: payment.PaymentNo,
						paymentName: payment.PaymentName,
						paymentVia: payment.Via,
						user: {
							connect: {
								email
							}
						}
					}
				})
				let result: ProductOrder | undefined
				if (type === 'prepaid') {
					result = await createPrepaidInqueryProductOrder({
						email,
						tx,
						fee: fees.reduce(
							(accumulator, fee) => accumulator + Number(fee.amount),
							0
						),
						price: toMoney(price),
						productId: product.id,
						productCode: product.code,
						refId: referenceId,
						status: OrderStatus.CONFIRMED,
						transactionId: transaction.id,
						trxId
					})
				}

				if (type === 'postpaid') {
					result = await tx.productOrder.findUniqueOrThrow({
						where: {
							refId: referenceId
						}
					})

					await tx.productOrder.update({
						where: {
							id: result.id
						},
						data: {
							fee: fees.reduce(
								(accumulator, fee) => accumulator + Number(fee.amount),
								0
							),
							price,
							transactionId: transaction.id,
							status: OrderStatus.CONFIRMED
						}
					})
				}

				if (!result) {
					throw new Error('failed to create product order')
				}

				const resultFee = []
				// initialize fee
				for (const item of fees) {
					resultFee.push(
						tx.productOrderFee.create({
							data: {
								addition: item.addition,
								amount: item.amount,
								source: item.source,
								type: item.type,
								orderId: result.id
							}
						})
					)
				}

				await Promise.all(resultFee)

				return payment
			}
		)

		return resultTr
	} finally {
		await prismaClient.$disconnect()
	}
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function getProductOrderByRef(
	referenceId: string
): Promise<ProductOrder> {
	await prismaClient.$connect()
	try {
		const result = await prismaClient.productOrder.findUniqueOrThrow({
			where: {
				refId: referenceId
			}
		})

		return result
	} finally {
		await prismaClient.$disconnect()
	}
}

export function getPrice(money: bigint): number {
	return Number(money) / BasePrice
}
