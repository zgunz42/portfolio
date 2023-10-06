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
		topUp(request: TopUpRequest): Promise<TopUpResult>
	}
	class IAKPostpaid {
		constructor(credential: Credential)
	}

	interface TopUpRequest {
		customerId: string
		/** must be unique */
		refId: string
		/** recive from [pricelist] */
		productCode: string
	}

	interface TopUpResult {
		status: string
		code: number
		data: PriceListData
	}

	interface PriceListData {
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
