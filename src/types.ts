import type { PostpaidInqueryData } from '@iak-id/iak-api-server-js'
import type { Prisma, PrismaClient } from '@prisma/client'

export interface InqueryInOrder {
	customerId: string
	productCode: string
	month?: number
	nomine?: number
	server?: string
	gameCode?: number
}

export interface InqueryWithOrder extends PostpaidInqueryData {
	productOrderId?: number
}

export interface InqueryOrder extends InqueryInOrder {
	refId: string
}

export interface ToupRequest {
	priceType: 'postpaid' | 'prepaid'
	customerId: string
	trId?: number
	refId?: string
	productCode: string
	paymentMethod: string
	paymentChannel: string
}

export interface IPayMuPaymetListResponse {
	Status: number
	Success: boolean
	Message: string
	Data: IpayMuDatum[]
}

export interface IpayMuDatum {
	Code: string
	Name?: string
	Description: string
	Channels: IPayMuChannel[]
}

export interface IPayMuChannel {
	Code: string
	Name: string
	Description: string
	PaymentIntrucionsDoc: string | null
	TransactionFee: IPayMuTransactionFee
}

export interface IPayMuTransactionFee {
	ActualFee: number
	ActualFeeType: IPayMuActualFeeType
	AdditionalFee: number
}

export enum IPayMuActualFeeType {
	Flat = 'FLAT',
	Percent = 'PERCENT'
}

export interface IpayMuDirectPayRequest {
	/** Buyer name */
	name: string
	/** Buyer phone */
	phone: string
	email: string
	amount: number
	/** Notify URL for receive webhook from iPaymu. (iPaymu will send param in POST method to this URL when buyer make a payment) */
	notifyUrl: string
	/**
	 * Custom expired payment code in hours (optional)
	 *
	 * Nb:
	 * - BSI VA max 3 hours
	 * - BRI VA max 2 hours
	 * - Con Store Alfamart can't be customized (default 24 hours)
	 * - QRIS can't be customized (default 24 hours) */
	expired?: number
	comments?: string
	/** Reference/transaction ID merchant (optional) */
	referenceId?: string
	/**
	 * Payment method.
	 *
	 * Value:
	 * - Virtual Account => 'va'
	 * - Convenience Store => 'cstore'
	 * - COD => 'cod'
	 * - QRIS => 'qris'
	 * - Credit Card => 'cc'
	 */
	paymentMethod: 'cc' | 'cod' | 'cstore' | 'qris' | 'va'

	/**
	 * Payment channel of the payment method
	 *
	 *	- Virtual Account (va)
	 *	  - BAG => 'bag'
	 *	  - BCA => 'bca'
	 *	  - BNI => 'bni'
	 *	  - Cimb Niaga => 'cimb'
	 *	  - Mandiri => 'mandiri'
	 *	  - Muamalat => 'bmi'
	 *	  - BRI => 'bri'
	 *	  - BSI => 'bsi'
	 *	  - Permata => 'permata'
	 *	  - Danamon => 'danamon'
	 *	- Convenience Store (cstore)
	 *	  - Alfamart => 'alfamart'
	 *	  - Indomaret => 'indomaret'
	 *	- Cash On Delivery (cod)
	 *	  - Kurir RPX => 'rpx'
	 *	- QRIS (qris)
	 *	  - qris => 'qris'
	 *	- Credit Card
	 *		- cc => 'cc'
	 */
	paymentChannel: string
	/** Product (for COD payment) (optional) */
	product?: unknown[]
	/** qty (for COD payment) (optional) */
	qty?: unknown[]
	/** price (for COD payment) (optional) */
	price?: unknown[]
	/** weight (for COD payment) (optional) */
	weight?: unknown[]
	/** width (for COD payment) (optional) */
	width?: unknown[]
	/** height (for COD payment) (optional) */
	height?: unknown[]
	/** length (for COD payment) (optional) */
	length?: unknown[]
	/** deliveryArea (for COD payment) (optional) */
	deliveryArea?: number
	/** deliveryAddress (for COD payment) (optional) */
	deliveryAddress?: string

	/**
	 *	Custom fee direction (optional)
	 *	- MERCHANT => fee charged to merchant,
	 *	- BUYER => fee charged to buyer
	 */
	feeDirection?: 'BUYER' | 'MERCHANT'
}

export interface IpayMuDirectPayResponse {
	Status: number
	Message: string
	Data: IpayMuDirectPayData
}

export interface IpayMuDirectPayData {
	SessionId: string
	TransactionId: number
	ReferenceId: string
	Via: string
	Channel: string
	PaymentNo: string
	PaymentName: string
	Total: number
	Fee: number
	Expired: Date
}

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type PrismaTx = Omit<
	PrismaClient<Prisma.PrismaClientOptions, never>,
	'$connect' | '$disconnect' | '$extends' | '$on' | '$transaction' | '$use'
>

export interface IpayMuCallbackResponse {
	trx_id: string
	sid: string
	sub_total: string
	total: string
	fee: string
	status_code: string
	status: string
	va: string
	via: string
	channel: string
	reference_id: string
}

export interface IpayMuCheckTransactionResponse {
	Status: number
	Data: IpayMuCheckTransactionData
	Message: string
}

export interface IpayMuCheckTransactionData {
	TransactionId: number
	SessionId: string
	ReferenceId: null
	RelatedId: number
	Sender: string
	Receiver: string
	Amount: number
	Fee: number
	Status: number
	StatusDesc: string
	Type: number
	TypeDesc: string
	Notes: string
	CreatedDate: Date
	ExpiredDate: Date
	SuccessDate?: Date
	SettlementDate?: Date
}
