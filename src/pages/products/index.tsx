'use client'

/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import type {
	InquiryPlnData,
	PostpaidInqueryData
} from '@iak-id/iak-api-server-js'
import {
	ActionIcon,
	Box,
	Button,
	Card,
	Center,
	Combobox,
	Container,
	Divider,
	Grid,
	Group,
	Input,
	InputBase,
	NumberInput,
	rem,
	Select,
	SimpleGrid,
	Stack,
	Text,
	TextInput,
	Title,
	Tooltip,
	useCombobox,
	useMantineTheme
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { ProductType } from '@prisma/client'
import {
	IconCalendar,
	IconCash,
	IconQuestionMark,
	IconUserScan
} from '@tabler/icons-react'
import CvImageCheckbox from 'components/CvImageCheckboxs'
import CvPageLayout from 'components/CvPageLayout'
import CvProducTypeInput from 'components/CvProductTypeInput'
import CvSearchField from 'components/CvSearchField'
import CvUserButton from 'components/CvUserButton'
import { gameServerMap } from 'constant'
import useGameServer from 'hooks/useGameServer'
import useLocale from 'hooks/useLocale'
import usePaymentList from 'hooks/usePaymentList'
import usePlaceOrder from 'hooks/usePlaceOrder'
import useProductCategoryList from 'hooks/useProductCategoryList'
import useProductList from 'hooks/useProductList'
import useProductOperatorList from 'hooks/useProductOperatorList'
import useSendInquery from 'hooks/useSendInquery'
import { delay } from 'lodash'
import Head from 'next/head'
import Link from 'next/link'
import type { FormEvent, ReactElement } from 'react'
import { useCallback, useState } from 'react'
import classes from 'themes/styles.module.css'
import type { IPayMuChannel } from 'types'
import calcPricing from 'utils/money/calcPricing'

const PRIMARY_COL_HEIGHT = rem(300)

const wrapper = (child: ReactElement): ReactElement => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { $t } = useLocale()
	return (
		<CvPageLayout>
			<Stack align='stretch' justify='center'>
				<Head>
					<title>Product | Adi Gunawan</title>
				</Head>
				<Container fluid mih='100vh' w='70%' my='md'>
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
}

function ProductsPage(): ReactElement {
	const theme = useMantineTheme()
	const paymentLists = usePaymentList()
	const inqueryMutate = useSendInquery()
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption()
	})
	const placeOrderAct = usePlaceOrder()

	const form = useForm({
		initialValues: {
			category: '',
			operator: '',
			customerNum: '',
			code: '',
			kind: '',
			paymentCode: '',
			server: '',
			nomine: 0
		}
	})

	const {
		data: categoryData,
		refetch: categoryRefetch,
		isError: categoryIsError,
		error: categoryError,
		isFetching: categoryIsLoading
	} = useProductCategoryList()
	const {
		data: operatorData,
		refetch: operatorRefetch,
		isError: operatorIsError,
		error: operatorError,
		isFetching: operatorIsLoading
	} = useProductOperatorList(form.values.category)
	const {
		data: productData,
		refetch: productRefetch,
		isError: productIsError,
		error: productError,
		isSuccess: productIsSuccess,
		isFetching: productIsLoading
	} = useProductList(form.values.operator)
	const isGameServer =
		form.values.category === 'game' &&
		Object.hasOwn(gameServerMap, form.values.operator)
	const gameCode = isGameServer
		? (gameServerMap[
				form.values.operator as keyof typeof gameServerMap
		  ] as unknown as number)
		: 0
	const gameServers = useGameServer(gameCode)
	const [product, setProduct] = useState(productData)

	const onSubmitOrder = (
		values: { category: string },
		event: FormEvent<HTMLFormElement> | undefined
	): void => {
		let paymentChannel = ''
		let paymentMethod = ''

		for (const payment of paymentLists.data ?? []) {
			for (const channel of payment.Channels) {
				if (channel.Code === form.values.paymentCode) {
					paymentChannel = channel.Code
					paymentMethod = payment.Code
				}
			}
		}

		if (paymentChannel === '' || paymentMethod === '') {
			showNotification({
				title: 'Payment not found',
				message: 'Payment not found',
				color: 'red'
			})
			return
		}

		placeOrderAct.mutate({
			customerId: form.values.customerNum,
			refId: inqueryMutate.data?.ref_id,
			paymentChannel,
			paymentMethod,
			priceType: form.values.kind === 'prepaid' ? 'prepaid' : 'postpaid',
			productCode: form.values.code,
			trId: inqueryMutate.data?.tr_id
		})
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { onChange: onCategoryChange, ...categoryProperties } =
		form.getInputProps('category')
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { onChange: onOperatorChange, ...operatorProperties } =
		form.getInputProps('operator')

	const onClickScan = (): void => {
		const productItem = productData.find(p => p.code === form.values.code)

		if (!productItem) {
			return
		}

		inqueryMutate.mutate({
			customerId: form.values.customerNum,
			productCode: productItem.code,
			[form.values.category === 'bpjs' ? 'month' : 'nomine']:
				form.values.nomine,
			server: form.values.server !== '' ? form.values.server : undefined,
			gameCode
		})

		form.setFieldValue('kind', productItem.type)
	}

	const onPaymentPick = (value: string): void => {
		form.setFieldValue('paymentCode', value)
		combobox.closeDropdown()
	}

	const onResetOperator = useCallback(() => {
		form.setFieldValue('operator', '')
		form.setFieldValue('kind', '')
		form.setFieldValue('code', '')
		setProduct([])
	}, [form])

	const onLabelCategoryChange = (value: string): void => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		onCategoryChange(value)
		combobox.closeDropdown()

		delay(onResetOperator, 100)
	}

	const mProductRefetch = useCallback(async () => {
		setProduct([])
		const result = await productRefetch()

		setProduct(result.data ?? [])
	}, [productRefetch])

	const onLabelOperatorChange = (value: string | null): void => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		onOperatorChange(value)

		delay(mProductRefetch, 100)
	}

	const paymentOptions: ReactElement[] = []

	if (paymentLists.isSuccess) {
		for (const payment of paymentLists.data) {
			paymentOptions.push(
				<Combobox.Group key={payment.Code} label={payment.Name}>
					{payment.Channels.map(item => (
						<Combobox.Option key={item.Code} value={item.Code}>
							{item.Name}
						</Combobox.Option>
					))}
				</Combobox.Group>
			)
		}
	}

	let paymentChannel: IPayMuChannel | undefined

	if (paymentLists.data) {
		for (const payment of paymentLists.data) {
			for (const channel of payment.Channels) {
				if (channel.Code === form.values.paymentCode) {
					paymentChannel = channel
				}
			}
		}
	}

	let productPrice = 'Rp. 0'
	let productPaymentFee = 'Rp. 0'
	let totalPayment = 'Rp. 0'
	let adminFee = 'Rp. 0'

	if (form.values.code !== '') {
		const item = productData.find(it => it.code === form.values.code)

		if (item) {
			const formatter = Intl.NumberFormat('id-ID', {
				style: 'currency',
				currency: 'IDR'
			})

			const { fee, price, subtotal } = calcPricing(
				item,
				inqueryMutate.data,
				paymentChannel?.TransactionFee
			)

			productPrice = formatter.format(price)
			productPaymentFee = formatter.format(fee.payment)
			adminFee = formatter.format(fee.admin)
			totalPayment = formatter.format(subtotal)
		}
	}

	return wrapper(
		<Grid
			py='md'
			gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}
			classNames={{
				inner: classes['grid-inner']
			}}
		>
			<Grid.Col span={{ xs: 12, md: 7 }}>
				<Card mih={PRIMARY_COL_HEIGHT} radius='md'>
					<Stack>
						<CvSearchField />
						<SimpleGrid cols={{ base: 1, sm: 2, md: 2 }}>
							{product.map(item => {
								const selected = form.values.code === item.code
								let title = Intl.NumberFormat('id-ID', {
									style: 'currency',
									currency: 'IDR'
								}).format(item.price)
								let description = item.name

								if (item.type === ProductType.POSTPAID) {
									title = `Fee ${title}`
								}

								if (
									item.type === ProductType.POSTPAID &&
									inqueryMutate.isSuccess &&
									// eslint-disable-next-line @typescript-eslint/no-unsafe-call
									!Object.hasOwn(inqueryMutate.data, 'error') &&
									selected
								) {
									title = Intl.NumberFormat('id-ID', {
										style: 'currency',
										currency: 'IDR'
									}).format(inqueryMutate.data.price)
									description = inqueryMutate.data.desc.product_desc
								}

								return (
									<CvImageCheckbox
										key={item.code}
										title={title}
										description={description}
										checked={selected}
										onChange={(): void => {
											form.setFieldValue('code', item.code)
											form.setFieldValue(
												'kind',
												item.type === ProductType.PREPAID
													? 'prepaid'
													: 'postpaid'
											)
										}}
										image={item.iconUrl ?? '/images/placeholder.png'}
									/>
								)
							})}
						</SimpleGrid>
					</Stack>
				</Card>
			</Grid.Col>
			<Grid.Col span={{ xs: 12, md: 5 }}>
				<Card mih={PRIMARY_COL_HEIGHT} radius='md'>
					<form onSubmit={form.onSubmit(onSubmitOrder)}>
						<CvProducTypeInput
							labels={categoryData.map(it => ({
								value: it.code,
								label: it.name
							}))}
							onOpen={(): void => {
								void categoryRefetch()
							}}
							onChange={onLabelCategoryChange}
							{...categoryProperties}
						/>

						<Select
							mt='md'
							comboboxProps={{
								withinPortal: true,
								resetSelectionOnOptionHover: true
							}}
							data={operatorData.map(it => ({
								value: it.code,
								label: it.name
							}))}
							placeholder='produk'
							label='Pilih Produk'
							searchValue={form.values.operator}
							onChange={onLabelOperatorChange}
							onDropdownOpen={(): void => {
								if (form.values.category !== '') {
									void operatorRefetch()
								}
							}}
							classNames={classes}
							{...operatorProperties}
						/>

						{isGameServer ? (
							<Select
								mt='md'
								label='Pilih server game'
								classNames={classes}
								placeholder='lokasi server ex: Asia'
								data={
									gameServers.data?.map(server => ({
										value: server.value,
										label: server.name
									})) ?? []
								}
								{...form.getInputProps('server')}
							/>
						) : undefined}

						<TextInput
							mt='md'
							label='Masukan Nomor Pelanggan'
							placeholder='phone number(pulsa/data) atau ID Customer'
							classNames={classes}
							rightSection={
								<ActionIcon
									onClick={onClickScan}
									color={theme.primaryColor}
									variant='filled'
								>
									<IconUserScan
										style={{ width: rem(18), height: rem(18) }}
										stroke={1.5}
									/>
								</ActionIcon>
							}
							{...form.getInputProps('customerNum')}
						/>
						{form.values.category === 'bpjs' ? (
							<NumberInput
								mt='md'
								label='Masukan Jumlah Bulan'
								placeholder='jumlah bulan bayar'
								classNames={classes}
								rightSection={
									<IconCalendar
										style={{ width: rem(18), height: rem(18) }}
										stroke={1.5}
									/>
								}
								{...form.getInputProps('nomine')}
							/>
						) : undefined}

						{form.values.category === 'emoney' ? (
							<NumberInput
								mt='md'
								label='Masukan Nominal'
								placeholder='jumlah di isi'
								classNames={classes}
								leftSection={<Text>Rp.</Text>}
								rightSection={
									<IconCash
										style={{ width: rem(18), height: rem(18) }}
										stroke={1.5}
									/>
								}
								{...form.getInputProps('nomine')}
							/>
						) : undefined}
						<Box mt='sm'>
							{form.values.kind === 'prepaid' &&
							form.values.category === 'pln' &&
							inqueryMutate.isSuccess &&
							!Object.hasOwn(inqueryMutate.data, 'error') ? (
								<CvUserButton
									title={(inqueryMutate.data as unknown as InquiryPlnData).name}
									description={
										(inqueryMutate.data as unknown as InquiryPlnData)
											.segment_power
									}
								/>
							) : undefined}
							{form.values.category === 'internet' &&
							inqueryMutate.isSuccess &&
							!Object.hasOwn(inqueryMutate.data, 'error') ? (
								<CvUserButton
									title={
										(inqueryMutate.data as unknown as PostpaidInqueryData)
											.tr_name
									}
									description={
										(inqueryMutate.data as unknown as PostpaidInqueryData)
											.period
									}
								/>
							) : undefined}
						</Box>
						<Combobox store={combobox} onOptionSubmit={onPaymentPick}>
							<Combobox.Target>
								<InputBase
									component='button'
									pointer
									mt='md'
									placeholder='Metode Bayar'
									label='Pilih Metode Bayar'
									classNames={classes}
									{...form.getInputProps('paymentCode')}
									rightSection={<Combobox.Chevron />}
									description={
										paymentChannel?.PaymentIntrucionsDoc ? (
											<Box>
												cara bayar untuk {paymentChannel.Name}
												<Link
													style={{ display: 'inline-block', marginLeft: 5 }}
													target='_blank'
													href={paymentChannel.PaymentIntrucionsDoc}
												>
													<Box
														style={{
															cursor: 'pointer',
															color: 'var(--mantine-color-sambat-9)'
														}}
														c='sambat'
													>
														di sini
													</Box>
												</Link>
											</Box>
										) : undefined
									}
									onClick={(): void => combobox.toggleDropdown()}
								>
									{paymentChannel ? (
										paymentChannel.Name
									) : (
										<Input.Placeholder>Pick Pembayaran</Input.Placeholder>
									)}
								</InputBase>
							</Combobox.Target>
							<Combobox.Dropdown>
								<Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
									{...paymentOptions}
								</Combobox.Options>
							</Combobox.Dropdown>
						</Combobox>
						<Box my='md' className={classes['price-detail-box']}>
							<SimpleGrid cols={2} verticalSpacing={0}>
								<Text className={classes['price-detail-title']}>Total</Text>
								<Text className={classes['price-detail-amount']}>
									{productPrice}
								</Text>
								<Group gap='xs'>
									<Text className={classes['price-detail-title']}>
										Payment Fee
									</Text>
									<Tooltip
										arrowOffset={10}
										arrowSize={4}
										label='Total payment method fee by payment gateway'
										withArrow
										position='top-start'
									>
										<ActionIcon size={14}>
											<IconQuestionMark size={14} />
										</ActionIcon>
									</Tooltip>
								</Group>
								<Text className={classes['price-detail-amount']}>
									{productPaymentFee}
								</Text>
								<Group gap='xs'>
									<Text className={classes['price-detail-title']}>
										Admin Fee
									</Text>
									<Tooltip
										arrowOffset={10}
										arrowSize={4}
										label='Fee for improve the service quality'
										withArrow
										position='top-start'
									>
										<ActionIcon size={14}>
											<IconQuestionMark size={14} />
										</ActionIcon>
									</Tooltip>
								</Group>
								<Text className={classes['price-detail-amount']}>
									{adminFee}
								</Text>
							</SimpleGrid>
							<Divider h={5} mt='sm' />
							<SimpleGrid cols={2}>
								<Text className={classes['price-detail-title']}>Subtotal</Text>
								<Text className={classes['price-detail-amount']}>
									{totalPayment}
								</Text>
							</SimpleGrid>
						</Box>
						<Group justify='center' mt='md'>
							<Button w='100%' type='submit'>
								Order
							</Button>
						</Group>
					</form>
				</Card>
			</Grid.Col>
		</Grid>
	)
}

export default ProductsPage
