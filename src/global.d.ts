/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-type-alias */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/no-extraneous-class */

/* eslint-disable max-classes-per-file */
declare module '@iak-id/iak-api-server-js' {
	class IAKPrepaid {
		constructor(credential: Credential)
		checkBalance(): Promise<CheckBalanceResult>
		pricelist(query?: PricelistInQuery): Promise<PriceListResult>
		topUp(request: TopUpPrepaidRequest): Promise<TopUpPrepaidResult>
		inquiryGameId(query: InquiryGameIdRequest): Promise<InquiryGameIdResponse>
		inquiryGameServer(
			query: InquiryGameServerRequest
		): Promise<InquiryGameServerResponse>
		inquiryPln(query: InquiryPlnRequest): Promise<InquiryPlnResponse>
	}
	class IAKPostpaid {
		constructor(credential: Credential)
		pricelist(query?: PostPaidPriceListQuery): Promise<PostpaidPriceListResult>
		inquiry(query: PostpaidInqueryRequest): Promise<PostpaidInqueryResponse>
		payment(
			input: PostpaidPaymentRequest
		): Promise<PostpaidPaymentInternetResponse>
		checkStatus(
			input: PostpaidCheckStatusRequest
		): Promise<PostpaidPaymentInternetResponse>
	}

	export interface PostpaidCheckStatusRequest {
		refId: string
	}

	export interface PostpaidPaymentRequest {
		trId: number
	}

	export interface PostpaidPaymentInternetResponse {
		data: PostpaidPaymentInternetData
		meta: unknown[]
		status: string
		code: number
	}

	export interface PostpaidPaymentInternetData {
		tr_id: number
		code: string
		datetime: string
		hp: string
		tr_name: string
		period: string
		nominal: number
		admin: number
		response_code: string
		message: string
		price: number
		selling_price: number
		balance: number
		noref: string
		ref_id: string
		desc: PostpaidPaymentInternetDesc
	}

	export interface PostpaidPaymentInternetDesc {
		product_desc: string
	}

	export interface InquiryPlnRequest {
		customerId: string
	}

	export interface InquiryPlnResponse {
		status: string
		code: number
		data: InquiryPlnData
	}

	export interface InquiryPlnData {
		status: string
		customer_id: string
		meter_no: string
		subscriber_id: string
		name: string
		segment_power: string
		message: string
		rc: string
	}

	export interface InquiryGameIdRequest {
		customerId: string
		gameCode: number
	}

	export interface InquiryGameIdResponse {
		status: string
		code: number
		data: InquiryGameIdData
	}

	export interface InquiryGameIdData {
		username: string
		status: number
		message: string
		rc: string
	}

	interface InquiryGameServerRequest {
		gameCode: string
	}

	export interface InquiryGameServerResponse {
		status: string
		code: number
		data: InquiryGameServerData
	}

	export interface InquiryGameServerData {
		servers: InquiryGameServer[]
		status: number
		message: string
		rc: string
	}

	export interface InquiryGameServer {
		name: string
		value: string
	}

	interface TopUpPrepaidRequest {
		customerId: string
		/** must be unique */
		refId: string
		/** recive from [pricelist] */
		productCode: string
	}

	interface ResponseError {
		response_code: string
		message: string
	}

	interface PostPaidPriceListQuery {
		type: string
		province: string
	}

	export interface PostpaidInqueryRequest {
		code: string
		hp: string
		refId: string
		nomorIdentitas?: string
		month?: string
		desc?: {
			amount: number
		}
	}

	export interface PostpaidInqueryResponse {
		status: string
		code: number
		data: PostpaidInqueryData
	}

	export interface PostpaidInqueryData {
		tr_id: number
		code: string
		hp: string
		tr_name: string
		period: string
		nominal: number
		admin: number
		ref_id: string
		response_code: string
		message: string
		price: number
		selling_price: number
		desc: PostpaidInqueryDesc
	}

	export interface PostpaidInqueryDesc {
		kode_cabang: string
		nama_cabang: string
		sisa_pembayaran: string
		jumlah_peserta: string
		product_desc: string
	}

	interface TopUpPrepaidResult {
		status: string
		code: number
		data: TopUpPrepaidData
	}

	interface TopUpPrepaidData {
		ref_id: string
		status: number
		product_code: string
		customer_id: string
		price: number
		message: string
		balance: number
		tr_id: number
		rc: string
	}

	export interface PostpaidPriceListResult {
		data: PostPiadPriceListData & ResponseError
		meta: unknown[]
	}

	export interface PostPiadPriceListData {
		pasca: Pasca[]
	}

	export interface Pasca {
		code: string
		name: string
		status: number
		fee: number
		komisi: number
		type: string
		category: string
	}

	interface PriceListResult {
		status: string
		code: number
		data: PriceListData
	}

	interface PriceListData {
		pricelist: Pricelist[]
		rc: string
		message: string
	}

	interface Pricelist {
		product_code: string
		product_description: string
		product_nominal: string
		product_details: string
		product_price: number
		product_type: string
		active_period: string
		status: string
		icon_url: string
		product_category: string
	}

	interface CheckBalanceResult {
		status: string
		code: number
		data: PriceListData
	}

	interface PriceListData {
		balance: number
		message: string
		rc: string
	}

	interface PricelistInQuery {
		type: PriceType
		operator: Operator
		status: 'active' | 'all' | 'non active'
	}

	type Operator =
		| DataPriceTypeOperator
		| EtollPriceTypeOperator
		| GamePriceTypeOperator
		| InternationalPriceTypeOperator
		| PlnPriceTypeOperator
		| PulsaPriceTypeOperator
		| VoucherPriceTypeOperator

	type PriceType =
		| 'data'
		| 'etoll'
		| 'game'
		| 'international'
		| 'pln'
		| 'pulsa'
		| 'voucher'

	type DataPriceTypeOperator =
		| 'axis_paket_internet'
		| 'indosat_paket_internet'
		| 'smartfren_paket_internet'
		| 'telkomsel_paket_internet'
		| 'telkomsel'
		| 'tri_paket_internet'
		| 'xl_paket_internet'

	type EtollPriceTypeOperator =
		| 'dana'
		| 'gopay_e-money'
		| 'indomaret_card_e-money'
		| 'linkaja'
		| 'mandiri_e-toll'
		| 'ovo'
		| 'shopee_pay'
		| 'tix_id'

	type GamePriceTypeOperator =
		| 'arena_of_valor'
		| 'battlenet_sea'
		| 'bleach_mobile_3d'
		| 'call_of_duty_mobile'
		| 'dragon_nest_m_-_sea'
		| 'era_of_celestials'
		| 'free_fire'
		| 'garena'
		| 'gemscool'
		| 'genshin_impact'
		| 'google_play_indonesia'
		| 'google_play_us_region'
		| 'itunes_us_region'
		| 'joox'
		| 'league_of_legends_wild_rift'
		| 'lifeafter'
		| 'light_of_thel:_glory_of_cepheus'
		| 'lords_mobile'
		| 'lyto'
		| 'marvel_super_war'
		| 'megaxus'
		| 'minecraft'
		| 'mobile_legend'
		| 'netflix'
		| 'nintendo_eshop'
		| 'playstation'
		| 'point_blank'
		| 'pubg_mobile'
		| 'pubg_pc'
		| 'ragnarok_m'
		| 'razer_pin'
		| 'skyegrid'
		| 'speed_drifters'
		| 'steam_sea'
		| 'vidio'
		| 'viu'
		| 'wave_game'
		| 'wifi_id'

	type InternationalPriceTypeOperator =
		| 'bangladesh_topup'
		| 'celcom'
		| 'china_topup'
		| 'chunghwa'
		| 'digi'
		| 'globe'
		| 'if_taiwan_topup'
		| 'm1'
		| 'malaysia_topup'
		| 'maxis'
		| 'ok_taiwan_topup'
		| 'singtel'
		| 'smart'
		| 'starhub'
		| 'sun_telecom'
		| 'thailand_topup'
		| 'tunetalk'
		| 'umobile'
		| 'vietnam_topup'
		| 'xox'

	type PlnPriceTypeOperator = 'pln'

	type PulsaPriceTypeOperator =
		| 'axis'
		| 'indosat'
		| 'smart'
		| 'telkomsel'
		| 'three'
		| 'xixi_games'
		| 'xl'

	type VoucherPriceTypeOperator =
		| 'alfamart'
		| 'carrefour'
		| 'indomaret'
		| 'map'
		| 'tokopedia'
		| 'traveloka'
		| 'udemy'

	type Stage = 'production' | 'sandbox'
	interface Credential {
		userHp: string
		stage: Stage
		apiKey: string
	}
}

declare module '*.module.css' {
	const classes: Record<string, string>
	export default classes
}

// eslint-disable-next-line unicorn/prevent-abbreviations, @typescript-eslint/no-explicit-any
declare type ArgumentsType<T> = T extends (...args: infer U) => any ? U : never

declare type CompElement = ReactElement<
	// eslint-disable-next-line @typescript-eslint/sort-type-union-intersection-members, @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
	any,
	// eslint-disable-next-line @typescript-eslint/sort-type-union-intersection-members, @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
	string | JSXElementConstructor<any>
>
