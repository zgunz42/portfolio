/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Box, Container, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import CvPageLayout from 'components/CvPageLayout'
import CvProductCard from 'components/CvProductCard'
import LoadingOrError from 'components/LoadingOrError'
import useLocale from 'hooks/useLocale'
import useProductList from 'hooks/useProductList'
import Head from 'next/head'
import type { ReactElement } from 'react'
import classes from 'themes/styles.module.css'

function ProductsPage(): ReactElement {
	const { $t } = useLocale()
	const { data, isError, error, isLoading } = useProductList()

	const wrapper = (child: ReactElement): ReactElement => (
		<CvPageLayout>
			<Stack align='stretch' justify='center'>
				<Head>
					<title>Product | Adi Gunawan</title>
				</Head>
				<Container>
					<Box className='mt-12 mb-8 text-center'>
						<Title
							dangerouslySetInnerHTML={{
								__html: $t('product.list.title')
							}}
							className={`${classes.titleDecorate} mb-2`}
						/>
						<Text className={`${classes.text} mx-auto max-w-sm`}>
							{$t('product.list.text')}
						</Text>
					</Box>
					{child}
				</Container>
			</Stack>
		</CvPageLayout>
	)

	if (isLoading) {
		return wrapper(<LoadingOrError />)
	}

	if (isError) {
		return wrapper(<LoadingOrError error={error as Error} />)
	}

	if (data === undefined) {
		return wrapper(<LoadingOrError error={new Error('Data not found')} />)
	}

	// const labels = data.data.pricelist
	// 	.map<string>(item => item.product_category)
	// 	.filter((item, index, collection) => collection.indexOf(item) === index)
	// const groups = data.data.pricelist
	// 	.map<string>(item => item.product_description)
	// 	.filter((item, index, collection) => collection.indexOf(item) === index)

	const displayGroup = (groupName: string): ReactElement => {
		const constents = data.data.pricelist.filter(
			item => item.product_description === groupName
		)

		return (
			<SimpleGrid cols={3}>
				{constents.map(item => (
					<CvProductCard
						key={item.product_code}
						code={item.product_code}
						thumbnail={item.icon_url}
						period={item.active_period}
						title={item.product_nominal}
						price={item.product_price}
						isActive={item.status === 'active'}
						activePeriod={item.active_period}
						description={item.product_details}
					/>
				))}
			</SimpleGrid>
		)
	}

	return wrapper(<SimpleGrid cols={3}>{displayGroup('All')}</SimpleGrid>)
}

export default ProductsPage
