/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { InquiryPlnData } from '@iak-id/iak-api-server-js'
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
import {
	IconCalendar,
	IconCash,
	IconQuestionMark,
	IconUserScan
} from '@tabler/icons-react'
import type { ProductList } from 'api'
import CvImageCheckbox from 'components/CvImageCheckboxs'
import CvPageLayout from 'components/CvPageLayout'
import CvProducTypeInput from 'components/CvProductTypeInput'
import CvSearchField from 'components/CvSearchField'
import CvUserButton from 'components/CvUserButton'
import LoadingOrError from 'components/LoadingOrError'
import { gameServerMap } from 'constant'
import useGameServer from 'hooks/useGameServer'
import useLocale from 'hooks/useLocale'
import usePaymentList from 'hooks/usePaymentList'
import useProductList from 'hooks/useProductList'
import useSendInquery from 'hooks/useSendInquery'
import Head from 'next/head'
import Link from 'next/link'
import type { FormEvent, ReactElement } from 'react'
import { createRef } from 'react'
import classes from 'themes/styles.module.css'
import type { IPayMuChannel } from 'types'

const PRIMARY_COL_HEIGHT = rem(300)

function ProductsPage(): ReactElement {
	const { $t } = useLocale()
	const inputTypeReference = createRef<HTMLInputElement>()
	const { data, isError, error, isLoading } = useProductList()
	const theme = useMantineTheme()
	const paymentLists = usePaymentList()
	const inqueryMutate = useSendInquery()
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption()
	})

	const form = useForm({
		initialValues: {
			type: '',
			service: '',
			customerNum: '',
			code: '',
			kind: '',
			paymentCode: '',
			server: '',
			nomine: 0
		}
	})
	const isGameServer =
		form.values.type === 'game' &&
		Object.hasOwn(gameServerMap, form.values.service)
	const gameCode = isGameServer
		? (gameServerMap[
				form.values.service as keyof typeof gameServerMap
		  ] as unknown as number)
		: 0
	const gameServers = useGameServer(gameCode)
	const wrapper = (child: ReactElement): ReactElement => (
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

	if (isLoading || !data) {
		return wrapper(<LoadingOrError />)
	}

	if (isError) {
		return wrapper(<LoadingOrError error={error as Error} />)
	}

	const onSubmitOrder = (
		values: { type: string },
		event: FormEvent<HTMLFormElement> | undefined
	): void => {
		console.log(form.values)
	}

	const options: string[] = []
	const { onChange, ...properties } = form.getInputProps('type')
	const displayItems: ProductList[] = []
	if (form.values.type !== '') {
		options.push(...Object.keys(data.indexs[form.values.type]))
	}

	if (form.values.service !== '') {
		console.log(form.values)
		const groups = data.indexs[form.values.type][form.values.service]
		for (const item of groups) {
			for (const price of data.pricelist) {
				if (price.product_code === item) {
					displayItems.push(price)
				}
			}
		}
	}

	const onClickScan = (): void => {
		const productItem = data.pricelist.find(
			p => p.product_code === form.values.code
		)

		if (!productItem) {
			return
		}

		inqueryMutate.mutate({
			customerId: form.values.customerNum,
			priceType: productItem.kind,
			productCode: productItem.product_code,
			productKind: productItem.product_type,
			[form.values.type === 'bpjs' ? 'month' : 'nomine']: form.values.nomine,
			server: form.values.server !== '' ? form.values.server : undefined,
			gameCode
		})

		form.setFieldValue('kind', productItem.kind)
	}

	const onPaymentPick = (value: string): void => {
		form.setFieldValue('paymentCode', value)
		combobox.closeDropdown()
	}

	const onLabelChange = (value: string): void => {
		if (inputTypeReference.current) {
			inputTypeReference.current.value = ''
			inputTypeReference.current.focus()
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		form.getInputProps('service').onChange('')
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		onChange(value)
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

	if (form.values.code !== '') {
		const item = data.pricelist.find(it => it.product_code === form.values.code)
		if (item) {
			if (form.values.kind === 'postpaid') {
				productPrice = Intl.NumberFormat('id-ID', {
					style: 'currency',
					currency: 'IDR'
				}).format(item.product_price)
			}

			if (form.values.kind === 'prepaid') {
				productPrice = Intl.NumberFormat('id-ID', {
					style: 'currency',
					currency: 'IDR'
				}).format(item.product_price)

				if (paymentChannel) {
					const fee = paymentChannel.TransactionFee

					if (fee.ActualFeeType !== 'FLAT') {
						const amount =
							item.product_price * (fee.ActualFee / 100) + fee.AdditionalFee

						productPaymentFee = Intl.NumberFormat('id-ID', {
							style: 'currency',
							currency: 'IDR'
						}).format(amount)

						const totalPaymentAmount = amount + item.product_price

						totalPayment = Intl.NumberFormat('id-ID', {
							style: 'currency',
							currency: 'IDR'
						}).format(totalPaymentAmount)
					} else {
						const amount = fee.ActualFee + fee.AdditionalFee
						productPaymentFee = Intl.NumberFormat('id-ID', {
							style: 'currency',
							currency: 'IDR'
						}).format(amount)

						const totalPaymentAmount = amount + item.product_price

						totalPayment = Intl.NumberFormat('id-ID', {
							style: 'currency',
							currency: 'IDR'
						}).format(totalPaymentAmount)
					}
				}
			}
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
							{displayItems.map(item => {
								const selected = form.values.code === item.product_code
								let title = Intl.NumberFormat('id-ID', {
									style: 'currency',
									currency: 'IDR'
								}).format(item.product_price)
								let description =
									item.product_details === '-'
										? item.product_description
										: item.product_details

								if (item.kind === 'postpaid') {
									title = `Fee ${title}`
								}

								if (
									item.kind === 'postpaid' &&
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
										key={item.product_code}
										title={title}
										description={description}
										checked={selected}
										onChange={(): void => {
											form.setFieldValue('code', item.product_code)
											form.setFieldValue('kind', item.kind)
										}}
										image={item.icon_url}
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
							labels={Object.keys(data.indexs)}
							required
							onChange={onLabelChange}
							{...properties}
						/>

						<Select
							ref={inputTypeReference}
							mt='md'
							comboboxProps={{ withinPortal: true }}
							data={options}
							placeholder='produk'
							label='Pilih Produk'
							searchable
							required
							classNames={classes}
							{...form.getInputProps('service')}
						/>

						{isGameServer ? (
							<Select
								mt='md'
								label='Pilih server game'
								classNames={classes}
								required
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
							required
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
						{form.values.type === 'bpjs' ? (
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

						{form.values.type === 'emoney' ? (
							<NumberInput
								mt='md'
								label='Masukan Nominal'
								placeholder='jumlah di isi'
								classNames={classes}
								required
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
							form.values.type === 'pln' &&
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
						</Box>
						<Combobox store={combobox} onOptionSubmit={onPaymentPick}>
							<Combobox.Target>
								<InputBase
									component='button'
									pointer
									mt='md'
									placeholder='Metode Bayar'
									label='Pilih Metode Bayar'
									required
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
								<Text className={classes['price-detail-amount']}>Rp. 0</Text>
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
