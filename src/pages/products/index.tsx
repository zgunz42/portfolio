/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { Pricelist } from '@iak-id/iak-api-server-js'
import {
	Box,
	Center,
	Container,
	Grid,
	Stack,
	Tabs,
	Text,
	Title
} from '@mantine/core'
import {
	IconDeviceGamepad,
	IconMobiledata,
	IconPhone,
	IconRoad,
	IconSignature,
	IconSolarElectricity,
	IconTicket,
	IconVideo,
	IconWorld
} from '@tabler/icons-react'
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
					<Center>
						<Box className={classes['product-headline']}>
							<Title
								ta='center'
								dangerouslySetInnerHTML={{
									__html: $t('product.list.title')
								}}
								className={classes.titleDecorate}
							/>
							<Text ta='center' className={classes.text}>
								{$t('product.list.text')}
							</Text>
						</Box>
					</Center>
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
	const knownLabels = new Set([
		'voucher',
		'data',
		'pln',
		'game',
		'etoll',
		'pulsa',
		'streaming',
		'emeterai'
	])

	let hasIntl = false
	const labels = data.pricelist
		.map<string>(item => item.product_type)
		.filter((item, index, collection) => {
			if (!knownLabels.has(item)) {
				hasIntl = true
				return false
			}

			return collection.indexOf(item) === index
		})

	const getIcon = (label: string): ReactElement => {
		switch (label) {
			case 'voucher':
				return <IconTicket />
			case 'data':
				return <IconMobiledata />
			case 'pln':
				return <IconSolarElectricity />
			case 'game':
				return <IconDeviceGamepad />
			case 'etoll':
				return <IconRoad />
			case 'pulsa':
				return <IconPhone />
			case 'streaming':
				return <IconVideo />
			case 'emeterai':
				return <IconSignature />
			default:
				return <IconWorld />
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (hasIntl) {
		labels.push('international')
	}

	const labelElement = labels.map(item => (
		<Tabs.Tab key={item} value={item} leftSection={getIcon(item)}>
			{item}
		</Tabs.Tab>
	))

	const dataMap = new Map<string, Pricelist[]>()

	for (const item of data.pricelist) {
		if (!knownLabels.has(item.product_type)) {
			if (dataMap.has('international')) {
				dataMap.get('international')?.push(item)
			} else {
				dataMap.set('international', [item])
			}
		} else if (dataMap.has(item.product_type)) {
			dataMap.get(item.product_type)?.push(item)
		} else {
			dataMap.set(item.product_type, [item])
		}
	}

	const tabGroupElement = []

	for (const [key, value] of dataMap) {
		const item = new Map<string, Pricelist[]>()

		for (const groupData of value) {
			if (!knownLabels.has(groupData.product_type)) {
				const keyName = `${groupData.product_type} (${groupData.product_description})`
				if (dataMap.has(keyName)) {
					dataMap.get(keyName)?.push(groupData)
				} else {
					dataMap.set(keyName, [groupData])
				}
			} else if (item.has(groupData.product_description)) {
				item.get(groupData.product_description)?.push(groupData)
			} else {
				item.set(groupData.product_description, [groupData])
			}
		}
		const itemElement = []

		for (const [mKey, mValue] of item) {
			itemElement.push(
				<Stack key={mKey} mt='lg'>
					{mKey !== '-' ? <Title>{mKey}</Title> : undefined}
					<Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
						{mValue.map(mItem => (
							<Grid.Col key={mItem.product_code} span={4}>
								<CvProductCard
									code={mItem.product_code}
									thumbnail={mItem.icon_url}
									period={mItem.active_period}
									title={mItem.product_nominal}
									price={mItem.product_price}
									isActive={mItem.status === 'active'}
									activePeriod={mItem.active_period}
									description={mItem.product_details}
									label={mItem.active_period}
								/>
							</Grid.Col>
						))}
					</Grid>
				</Stack>
			)
		}

		tabGroupElement.push(
			<Tabs.Panel key={key} value={key}>
				{itemElement}
			</Tabs.Panel>
		)
	}

	return wrapper(
		<Container>
			<Tabs defaultValue={labels[0]}>
				<Tabs.List grow>{labelElement}</Tabs.List>
				{tabGroupElement}
			</Tabs>
		</Container>
	)
}

export default ProductsPage
