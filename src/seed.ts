/* eslint-disable unicorn/prefer-top-level-await */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { IncomeType, ProductStatus, ProductType } from '@prisma/client'
import { knownLabels } from './constant'
import {
	getPostpaidProductList,
	getPrepaidProductList,
	prismaClient
} from './serverUtils'

interface Group {
	id?: number
	code: string
	name: string
}

interface Operator extends Group {
	category: string
	categoryId?: number
}

interface Product extends Group {
	type: ProductType
	isFixed: boolean
	iconUrl?: string
	operator: string
	operatorId?: number
	description: string
	price: number
	incomeType: IncomeType
	status: ProductStatus
	lastPullDate: Date
}

async function main(): Promise<void> {
	const prepaidProduct = await getPrepaidProductList()
	const postpaidProduct = await getPostpaidProductList()
	const productCategoryInputs: Record<string, Group> = {}
	const productOperatorInputs: Record<string, Operator> = {}
	const productItemInputs: Record<string, Product> = {}

	for (const item of prepaidProduct.pricelist) {
		let label = item.product_type
		if (!knownLabels.has(item.product_type)) {
			label = 'international'
		}
		productCategoryInputs[item.product_type] = {
			code: item.product_type,
			name: label
		}
		const operatorKey =
			label === 'international'
				? item.product_type
				: // eslint-disable-next-line unicorn/no-nested-ternary
				item.product_description === '-'
				? item.product_type
				: item.product_description

		productOperatorInputs[operatorKey] = {
			category: item.product_type,
			name: operatorKey,
			code: operatorKey
		}

		productItemInputs[item.product_code] = {
			code: item.product_code,
			type: ProductType.PREPAID,
			isFixed: false,
			name:
				item.product_description === '-'
					? operatorKey
					: item.product_description,
			operator: operatorKey,
			description: item.product_details,
			iconUrl: item.icon_url,
			incomeType: IncomeType.REVENUE,
			price:
				item.product_price *
				Number.parseInt(process.env.MONEY_BASE_DIGIT ?? '1', 10),
			status:
				item.status === 'active'
					? ProductStatus.ACTIVE
					: ProductStatus.INACTIVE,
			lastPullDate: new Date()
		}
	}

	for (const item of postpaidProduct.pasca) {
		productCategoryInputs[item.type] = {
			code: item.type,
			name: item.type
		}

		productOperatorInputs[item.code] = {
			category: item.type,
			name: item.name,
			code: item.code
		}

		productItemInputs[item.code] = {
			code: item.code,
			name: item.name,
			operator: item.code,
			type: ProductType.POSTPAID,
			isFixed: false,
			description: '',
			incomeType: IncomeType.COMISSION,
			price:
				(item.komisi < item.fee ? item.fee - item.komisi : item.komisi) *
				Number.parseInt(process.env.MONEY_BASE_DIGIT ?? '100', 10),
			status: item.status === 1 ? ProductStatus.ACTIVE : ProductStatus.INACTIVE,
			lastPullDate: new Date()
		}
	}

	await prismaClient.$transaction(async tx => {
		const resultCategory = []
		for (const item of Object.keys(productCategoryInputs)) {
			resultCategory.push(
				tx.productCategory.upsert({
					where: {
						id: undefined,
						code: productCategoryInputs[item].code
					},
					create: productCategoryInputs[item],
					update: productCategoryInputs[item]
				})
			)
		}

		const dataCategory = await Promise.all(resultCategory)

		for (const item of dataCategory) {
			productCategoryInputs[item.code].id = item.id
		}
		const resultProvider = []
		for (const item of Object.keys(productOperatorInputs)) {
			const categoryId =
				productCategoryInputs[productOperatorInputs[item].category].id
			const { id, category, ...data } = productOperatorInputs[item]
			if (categoryId) {
				resultProvider.push(
					tx.operator.upsert({
						create: {
							...data,
							categoryId
						},
						update: {
							...data,
							categoryId
						},
						where: {
							id: undefined,
							code: productOperatorInputs[item].code
						}
					})
				)
			} else {
				console.log(data)
			}
		}

		const dataProvider = await Promise.all(resultProvider)
		for (const item of dataProvider) {
			productOperatorInputs[item.code].id = item.id
		}

		const resultProduct = []

		for (const item of Object.keys(productItemInputs)) {
			const operatorId =
				productOperatorInputs[productItemInputs[item].operator].id
			const { id, operator, ...data } = productItemInputs[item]
			if (operatorId) {
				resultProduct.push(
					tx.product.upsert({
						create: {
							...data,
							operatorId
						},
						update: {
							...data,
							operatorId
						},
						where: {
							id: undefined,
							code: productItemInputs[item].code
						}
					})
				)
			}
		}

		const dataProduct = await Promise.all(resultProduct)

		// eslint-disable-next-line no-console
		console.log(`Create ${dataProduct.length} product`)
	})
}

main()
	.then(async () => {
		await prismaClient.$disconnect()
	})
	.catch(async error => {
		console.error(error)
		await prismaClient.$disconnect()
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1)
	})
