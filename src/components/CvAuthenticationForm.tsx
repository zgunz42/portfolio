'use client'

/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-handler-names */
import type { PaperProps } from '@mantine/core'
import {
	Anchor,
	Button,
	Checkbox,
	Divider,
	Group,
	Paper,
	PasswordInput,
	Stack,
	Text,
	TextInput
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { upperFirst, useToggle } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { parseUrl } from 'next/dist/shared/lib/router/utils/parse-url'
import GoogleButton from './GoogleButton'
import TwitterButton from './TwitterButton'

interface Properties extends PaperProps {
	csrfToken: string
}

export default function CvAuthenticationForm({
	csrfToken,
	...properties
}: Properties): CompElement {
	const [type, toggle] = useToggle(['login', 'register'])
	const form = useForm({
		initialValues: {
			email: '',
			csrfToken,
			name: '',
			password: '',
			terms: true
		},

		validate: {
			email: value => (/^\S+@\S+$/.test(value) ? undefined : 'Invalid email'),
			password: value =>
				value.length <= 6
					? 'Password should include at least 6 characters'
					: undefined
		}
	})

	return (
		<Paper radius='md' p='xl' withBorder {...properties}>
			<Text size='lg' fw={500}>
				Welcome to Sambat, {type} with
			</Text>

			<Group grow mb='md' mt='md'>
				<GoogleButton radius='xl'>Google</GoogleButton>
				<TwitterButton radius='xl'>Twitter</TwitterButton>
			</Group>

			<Divider label='Or continue with email' labelPosition='center' my='lg' />

			<form
				onSubmit={form.onSubmit(async () => {
					try {
						if (type === 'login') {
							const result = await fetch('/api/auth/callback/credentials', {
								method: 'POST',
								body: JSON.stringify(form.values),
								headers: {
									'Content-Type': 'application/json'
								}
							})
							if (result.url.includes('error')) {
								const urlResult = parseUrl(result.url)
								showNotification({
									title: 'Error',
									message: urlResult.query.error,
									color: 'red'
								})
							} else {
								showNotification({
									title: 'Success',
									message: 'Logged in successfully',
									color: 'green'
								})

								window.location.href = result.url
							}
						}

						if (type === 'register') {
							const result = await fetch('/api/auth/register', {
								method: 'POST',
								body: JSON.stringify(form.values),
								headers: {
									'Content-Type': 'application/json'
								}
							})

							if (result.url.includes('error')) {
								const urlResult = parseUrl(result.url)
								showNotification({
									title: 'Error',
									message: urlResult.query.error,
									color: 'red'
								})
							} else {
								showNotification({
									title: 'Success',
									message: 'Registered successfully',
									color: 'green'
								})

								window.location.href = result.url
							}
						}
					} catch {
						showNotification({
							title: 'Error',
							message: 'Something went wrong',
							color: 'red'
						})
					}

					form.reset()
				})}
			>
				<Stack>
					{type === 'register' && (
						<TextInput
							label='Name'
							placeholder='Your name'
							value={form.values.name}
							onChange={(event): void =>
								form.setFieldValue('name', event.currentTarget.value)
							}
							radius='md'
						/>
					)}

					<TextInput
						required
						label='Email'
						placeholder='hello@mantine.dev'
						value={form.values.email}
						onChange={(event): void =>
							form.setFieldValue('email', event.currentTarget.value)
						}
						error={form.errors.email ? 'Invalid email' : undefined}
						radius='md'
					/>

					<PasswordInput
						required
						label='Password'
						placeholder='Your password'
						value={form.values.password}
						onChange={(event): void =>
							form.setFieldValue('password', event.currentTarget.value)
						}
						error={
							form.errors.password
								? 'Password should include at least 6 characters'
								: undefined
						}
						radius='md'
					/>

					{type === 'register' && (
						<Checkbox
							label='I accept terms and conditions'
							checked={form.values.terms}
							onChange={(event): void =>
								form.setFieldValue('terms', event.currentTarget.checked)
							}
						/>
					)}
				</Stack>

				<Group justify='space-between' mt='xl'>
					<Anchor
						component='button'
						type='button'
						c='dimmed'
						onClick={(): void => toggle()}
						size='xs'
					>
						{type === 'register'
							? 'Already have an account? Login'
							: "Don't have an account? Register"}
					</Anchor>
					<Button type='submit' radius='xl'>
						{upperFirst(type)}
					</Button>
				</Group>
			</form>
		</Paper>
	)
}
