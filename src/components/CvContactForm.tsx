/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable react/jsx-props-no-spreading */
import {
	Button,
	Card,
	Checkbox,
	LoadingOverlay,
	Select,
	SimpleGrid,
	Stack,
	Text,
	Textarea,
	TextInput,
	Title
} from '@mantine/core'
import { joiResolver, useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useMutation } from '@tanstack/react-query'
import type { ScheduleData } from 'api'
import { addSchedule, Subject } from 'api'
import { MeetDuration } from 'constant'
import useLocale from 'hooks/useLocale'
import Joi from 'joi'

function CvContactForm(): CompElement {
	const { $t } = useLocale()
	const schema = Joi.object<ScheduleData & { termsOfService: boolean }>({
		fullname: Joi.string()
			.min(2)
			.message('Name should have at least 2 letters'),
		email: Joi.string()
			.email({
				tlds: { allow: false }
			})
			.message('Invalid email'),
		company: Joi.optional(),
		duration: Joi.number(),
		phone: Joi.string().min(10).max(13).message('Invalid phone number'),
		meet_date: Joi.string().isoDate().message('Invalid date'),
		subject: Joi.string().valid(...Object.values(Subject)),
		message: Joi.string()
			.min(10)
			.message('Message should have at least 10 letters'),
		termsOfService: Joi.boolean().required()
	})
	const form = useForm<ScheduleData & { termsOfService: boolean }>({
		initialValues: {
			email: '',
			fullname: '',
			phone: '',
			company: '',
			duration: MeetDuration,
			meet_date: '',
			subject: Subject.JobOffer,
			message: '',
			termsOfService: false
		},
		validate: joiResolver(schema)
	})

	const scheduleMutate = useMutation(
		async (schedule: ScheduleData) => addSchedule(schedule),
		{
			onSuccess: () => {
				showNotification({
					title: $t('schedule_added'),
					color: 'green',
					loading: false,
					message: $t('schedule_added_message')
				})
				form.reset()
			}
		}
	)

	return (
		<Card>
			<Title order={2} className='mb-8 text-center'>
				{$t('contact.form.title')}
			</Title>
			<form
				onSubmit={form.onSubmit(values => {
					scheduleMutate.mutate(values)
				})}
			>
				<LoadingOverlay visible={scheduleMutate.isLoading} />
				<Stack>
					<TextInput
						required
						label={$t('contact.form.name.label')}
						placeholder={$t('contact.form.name.placeholder')}
						{...form.getInputProps('fullname')}
					/>
					<SimpleGrid cols={2}>
						<TextInput
							required
							label={$t('contact.form.email.label')}
							type='email'
							placeholder={$t('contact.form.email.placeholder')}
							{...form.getInputProps('email')}
						/>

						<TextInput
							required
							label={$t('contact.form.phone.label')}
							type='tel'
							placeholder={$t('contact.form.phone.placeholder')}
							{...form.getInputProps('phone')}
						/>
					</SimpleGrid>
					<TextInput
						label={$t('contact.form.company.label')}
						placeholder={$t('contact.form.company.placeholder')}
						{...form.getInputProps('company')}
					/>
					<SimpleGrid cols={2}>
						<TextInput
							required
							label={$t('contact.form.meet_date.label')}
							placeholder={$t('contact.form.meet_date.placeholder')}
							type={'datetime-local' as 'url'}
							{...form.getInputProps('meet_date')}
						/>
						<Select
							required
							placeholder={$t('contact.form.subject.placeholder')}
							label={$t('contact.form.subject.label')}
							data={Object.values(Subject)}
							{...form.getInputProps('subject')}
						/>
					</SimpleGrid>

					<Textarea
						label={$t('contact.form.message.label')}
						required
						placeholder={$t('contact.form.message.placeholder')}
						{...form.getInputProps('message')}
					/>
				</Stack>
				<Checkbox
					mt='md'
					label={$t('contact.form.tos')}
					{...form.getInputProps('termsOfService', {
						type: 'checkbox'
					})}
				/>

				<Stack mt='md' className='mt-8 text-center'>
					<Button type='submit'>{$t('contact.form.submit')}</Button>
					<Text className='text-sm italic'>
						<span className='font-extrabold text-red-500'>*</span>
						{$t('contact.form.required')}
					</Text>
				</Stack>
			</form>
		</Card>
	)
}

export default CvContactForm
