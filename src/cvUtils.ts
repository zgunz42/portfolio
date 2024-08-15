/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-unused-vars */
import fetch from 'cross-fetch'
import type { PDFPage, PDFPageDrawTextOptions } from 'pdf-lib'
import {
	layoutMultilineText,
	PDFDocument,
	PDFString,
	rgb,
	StandardFonts,
	TextAlignment
} from 'pdf-lib'

interface CvJobExperience {
	company: string
	location: string
	position: string
	startAt: Date
	endAt: Date
	description: string
}

interface CVContact {
	email: string
	phone: string
	address: string
	github: string
	linkedin: string
	instagram: string
}

interface CVSkills {
	name: string
	techs: string[]
}

interface CVSpokenLanguages {
	name: string
	level: string
}

interface CVEducation {
	type: string
	name: string
	location: string
	startAt: Date
	graduationAt: Date
	description: string
	certificate?: string
}

export interface ComponentInfo {
	width: number
	height: number
	x: number
	y: number
}

export interface ListItem {
	title: string
	subtitle?: string
	startAt: Date
	endAt: Date
	description: string
}

export interface ListLinkItem {
	title: string
	subtitle?: string
	link: string
	description: string
}

export interface SmallTextItem {
	title: string
	body: string
}

export interface CVProject {
	name: string
	link: string
	description: string
	subtitle: string
}

export interface CVProperties {
	avatar: string
	background?: string
	name: string
	birthdate: Date
	jargon: string
	jobExperience: CvJobExperience[]
	contact: CVContact
	skills: CVSkills[]
	spokenLanguages: CVSpokenLanguages[]
	educations: CVEducation[]
	projects: CVProject[]
}
const Width = 793.738_59
const Height = 1122.519_65
const leftMargin = 72.49
const nameYPosition = 100
const nameFontSize = 23
const maxFirstRowWidth = 487
const maxSecondRowWidth = Width - leftMargin - maxFirstRowWidth
const margin = 20
const marginSmall = 8
const jobExperienceSpacing = 14
const baseFontSize = 14
const lineHeight = baseFontSize + marginSmall
const marginWide = 30
const jargonFontSize = 16
const jargonYPosition = nameYPosition + jargonFontSize + marginSmall
const birthYPosition = jargonYPosition + jargonFontSize + baseFontSize
const titleExperienceFontSize = 16
const titleExperienceYPosition =
	birthYPosition + titleExperienceFontSize + marginWide
const contentExperienceYPosition = titleExperienceYPosition + 4
const languageMessage = {
	contact: {
		en: 'Contact',
		id: 'Kontak'
	},
	skills: {
		en: 'Skills',
		id: 'Keahlian Kerja'
	},
	spokenLanguages: {
		en: 'Spoken Languages',
		id: 'Kemampuan Bahasa'
	},
	education: {
		en: 'Education',
		id: 'Pendidikan'
	},
	projects: {
		en: 'Projects',
		id: 'Proyek'
	},
	jobExperience: {
		en: 'Job Experience',
		id: 'Pengalaman Kerja'
	}
}

export enum Language {
	EN = 'en',
	ID = 'id'
}
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const primaryColor = rgb(0.11, 0.49, 0.84)
export async function createCVPdf(
	data: CVProperties,
	language: Language = Language.ID
): Promise<Uint8Array> {
	const localName = language === Language.ID ? 'id-ID' : 'en-US'
	const dateFormatter = Intl.DateTimeFormat(localName, {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
	const pdfDocument = await PDFDocument.create()
	const helveticaFont = await pdfDocument.embedFont(StandardFonts.Helvetica)
	const helveticaBoldFont = await pdfDocument.embedFont(
		StandardFonts.HelveticaBold
	)
	// download avatar image
	// eslint-disable-next-line unicorn/prevent-abbreviations
	const avatarImageBytes = await fetch(data.avatar).then(async res =>
		res.arrayBuffer()
	)
	const avatarImage = await pdfDocument.embedJpg(avatarImageBytes)
	const page = pdfDocument.addPage([Width, Height])
	const ImageSize = 80

	if (data.background) {
		// eslint-disable-next-line unicorn/prevent-abbreviations
		const bgImageBytes = await fetch(data.background).then(async res =>
			res.arrayBuffer()
		)
		const bgImage = await pdfDocument.embedPng(bgImageBytes)
		// at very bottom of layer
		page.drawImage(bgImage, {
			x: 0,
			y: 0,
			width: Width,
			height: Height
		})
	}

	page.drawImage(avatarImage, {
		x: leftMargin,
		y: Height - nameYPosition - ImageSize + margin,
		height: ImageSize,
		width: ImageSize
	})
	page.drawText(data.name, {
		x: leftMargin + ImageSize + margin,
		y: Height - nameYPosition,
		size: nameFontSize,
		maxWidth: maxFirstRowWidth - leftMargin,
		font: helveticaBoldFont
	})
	page.drawText(data.jargon, {
		x: leftMargin + ImageSize + margin,
		y: Height - jargonYPosition,
		size: jargonFontSize,
		maxWidth: maxFirstRowWidth - leftMargin,
		font: helveticaFont
	})
	const age = new Date().getFullYear() - data.birthdate.getFullYear()
	page.drawText(`${dateFormatter.format(data.birthdate)} (${age})`, {
		x: leftMargin + ImageSize + margin,
		y: Height - birthYPosition,
		size: jargonFontSize,
		opacity: 0.95,
		maxWidth: maxFirstRowWidth - leftMargin,
		font: helveticaFont
	})
	page.drawText(languageMessage.jobExperience[language], {
		x: leftMargin,
		y: Height - titleExperienceYPosition,
		size: titleExperienceFontSize,
		maxWidth: maxFirstRowWidth - leftMargin,
		font: helveticaBoldFont,
		color: primaryColor
	})
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	const experienceInfo = drawListItem<ListItem>({
		page,
		language,
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		renderItem: drawItem,
		data: data.jobExperience.map(item => ({
			title: `${item.company}, ${item.location}`,
			subtitle: item.position,
			startAt: item.startAt,
			endAt: item.endAt,
			description: item.description
		})),
		bodyStyle: {
			font: helveticaFont
		},
		titleStyle: {
			font: helveticaBoldFont
		},
		itemSpacing: jobExperienceSpacing,
		position: {
			x: leftMargin,
			y: Height - contentExperienceYPosition
		}
	})
	const eduYPosition = experienceInfo.y - experienceInfo.height - margin
	page.drawText(languageMessage.education[language], {
		x: leftMargin,
		y: eduYPosition,
		size: titleExperienceFontSize,
		maxWidth: maxFirstRowWidth - leftMargin,
		font: helveticaBoldFont,
		color: primaryColor
	})

	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	const eduInfo = drawListItem({
		page,
		language,
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		renderItem: drawItem,
		data: data.educations.map(item => ({
			title: `${item.name}`,
			subtitle: item.type,
			startAt: item.startAt,
			endAt: item.graduationAt,
			description: item.description
		})),
		bodyStyle: {
			font: helveticaFont
		},
		titleStyle: {
			font: helveticaBoldFont
		},
		itemSpacing: jobExperienceSpacing,
		position: {
			x: leftMargin,
			y: eduYPosition
		}
	})
	const projectYPosition = eduInfo.y - eduInfo.height - margin
	page.drawText(languageMessage.projects[language], {
		x: leftMargin,
		y: projectYPosition,
		size: titleExperienceFontSize,
		maxWidth: maxFirstRowWidth - leftMargin,
		font: helveticaBoldFont,
		color: primaryColor
	})

	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	drawListItem({
		page,
		language,
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		renderItem: drawLinkItem,
		data: data.projects.map(item => ({
			title: `${item.name}`,
			description: item.description,
			link: item.link,
			subtitle: item.subtitle
		})),
		bodyStyle: {
			font: helveticaFont
		},
		titleStyle: {
			font: helveticaBoldFont
		},
		itemSpacing: jobExperienceSpacing,
		position: {
			x: leftMargin,
			y: projectYPosition
		}
	})

	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	const contactInfo = drawContact({
		page,
		data: data.contact,
		language,
		titleStyle: {
			color: primaryColor,
			font: helveticaBoldFont,
			maxWidth: maxSecondRowWidth
		},
		bodyStyle: {
			font: helveticaFont,
			size: baseFontSize,
			opacity: 0.95
		},
		position: {
			x: maxFirstRowWidth + margin,
			y: Height - nameYPosition
		}
	})
	const skillYPosition = contactInfo.y - (contactInfo.height + marginWide)
	page.drawText(languageMessage.skills[language], {
		x: contactInfo.x,
		y: skillYPosition,
		size: titleExperienceFontSize,
		maxWidth: maxFirstRowWidth - leftMargin,
		font: helveticaBoldFont,
		color: primaryColor
	})
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	const skillContentInfo = drawListItem<SmallTextItem>({
		page,
		language,
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		renderItem: drawSmallListItem,
		data: data.skills.map(item => ({
			title: item.name,
			body: `(${item.techs.join(', ')})`
		})),
		bodyStyle: {
			size: baseFontSize,
			font: helveticaFont
		},
		titleStyle: {
			size: baseFontSize,
			font: helveticaBoldFont
		},
		itemSpacing: 4,
		position: {
			x: contactInfo.x,
			y: skillYPosition + 4
		}
	})

	const langYPosition =
		skillContentInfo.y - (skillContentInfo.height + margin + marginSmall)
	page.drawText(languageMessage.spokenLanguages[language], {
		x: contactInfo.x,
		y: langYPosition,
		size: titleExperienceFontSize,
		maxWidth: maxFirstRowWidth - leftMargin,
		font: helveticaBoldFont,
		color: primaryColor
	})
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	drawListItem({
		page,
		language,
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		renderItem: drawSmallListItem,
		data: data.spokenLanguages.map(item => ({
			title: item.name,
			body: `Level (${item.level})`
		})),
		bodyStyle: {
			size: baseFontSize,
			font: helveticaFont
		},
		titleStyle: {
			size: baseFontSize,
			font: helveticaBoldFont
		},
		itemSpacing: 4,
		position: {
			x: contactInfo.x,
			y: langYPosition + 4
		}
	})
	const pdfBytes = await pdfDocument.save()

	return pdfBytes
}

interface ItemProperties<T> {
	page: PDFPage
	language: Language
	position: {
		x: number
		y: number
	}
	titleStyle: Omit<PDFPageDrawTextOptions, 'x' | 'y'>
	bodyStyle: Omit<PDFPageDrawTextOptions, 'x' | 'y'>
	data: T
}

interface ItemSmallPropeties {
	page: PDFPage
	position: {
		x: number
		y: number
	}
	titleStyle: Omit<PDFPageDrawTextOptions, 'x' | 'y'>
	bodyStyle: Omit<PDFPageDrawTextOptions, 'x' | 'y'>
	data: SmallTextItem
}

interface DataListsProperties<T>
	extends Pick<ItemProperties<T>, 'bodyStyle' | 'titleStyle'> {
	page: PDFPage
	language: Language
	data: T[]
	renderItem: (item: ItemProperties<T>) => ComponentInfo
	position: {
		x: number
		y: number
	}
	itemSpacing: number
}

function drawItem({
	page,
	titleStyle,
	position,
	language,
	bodyStyle,
	data
}: ItemProperties<ListItem>): ComponentInfo {
	const info: ComponentInfo = {
		height: 0,
		width: 0,
		x: position.x,
		y: position.y
	}
	const fontSize = 14
	const maxWidth = maxFirstRowWidth - leftMargin
	info.width = maxWidth
	const companyNameYPosition = position.y - (fontSize + marginSmall)
	page.drawText(`${data.title}${data.subtitle ? ` — ${data.subtitle}` : ''}`, {
		x: position.x,
		y: companyNameYPosition,
		size: fontSize,
		maxWidth,
		...titleStyle
	})
	info.height += fontSize + marginSmall
	const workTimeYPosition = companyNameYPosition - (fontSize + marginSmall)
	info.height += fontSize + marginSmall
	const localName = language === Language.ID ? 'id-ID' : 'en-US'
	const dateFormatter = Intl.DateTimeFormat(localName, {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
	const startDate = dateFormatter.format(data.startAt)
	const endDate = dateFormatter.format(data.endAt)
	page.drawText(`${startDate} - ${endDate}`, {
		x: position.x,
		y: workTimeYPosition,
		size: fontSize,
		opacity: 0.95,
		maxWidth,
		...bodyStyle
	})
	const descriptionYPosition = workTimeYPosition - (fontSize + marginSmall)
	const MaxCharacter = 143
	page.drawText(data.description.slice(0, MaxCharacter), {
		x: leftMargin,
		y: descriptionYPosition,
		size: fontSize,
		maxWidth,
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		lineHeight: fontSize,
		opacity: 0.75,
		...bodyStyle
	})
	info.height += fontSize * 3 + marginSmall

	return info
}

function drawLinkItem({
	page,
	titleStyle,
	position,
	bodyStyle,
	data
}: ItemProperties<ListLinkItem>): ComponentInfo {
	const info: ComponentInfo = {
		height: 0,
		width: 0,
		x: position.x,
		y: position.y
	}
	const fontSize = 14
	const maxWidth = maxFirstRowWidth - leftMargin
	info.width = maxWidth
	const companyNameYPosition = position.y - (fontSize + marginSmall)
	page.drawText(`${data.title}${data.subtitle ? ` — ${data.subtitle}` : ''}`, {
		x: position.x,
		y: companyNameYPosition,
		size: fontSize,
		maxWidth,
		...titleStyle
	})
	info.height += fontSize + marginSmall
	const workTimeYPosition = companyNameYPosition - (fontSize + marginSmall)
	info.height += fontSize + marginSmall

	page.drawText(`${data.link}`, {
		x: position.x,
		y: workTimeYPosition,
		size: fontSize,
		color: primaryColor,
		opacity: 0.95,
		maxWidth,
		...bodyStyle
	})
	const descriptionYPosition = workTimeYPosition - (fontSize + marginSmall)
	const MaxCharacter = 143
	page.drawText(data.description.slice(0, MaxCharacter), {
		x: leftMargin,
		y: descriptionYPosition,
		size: fontSize,
		maxWidth,
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		lineHeight: fontSize,
		opacity: 0.75,
		...bodyStyle
	})
	info.height += fontSize * 3 + marginSmall

	return info
}

function drawSmallListItem({
	data: { body, title },
	bodyStyle,
	page,
	position,
	titleStyle
}: ItemSmallPropeties): ComponentInfo {
	const info: ComponentInfo = {
		height: 0,
		width: 0,
		x: position.x,
		y: position.y
	}

	const fontSize = 14
	const maxWidth = maxFirstRowWidth - leftMargin
	info.width = maxWidth
	const titleYPosition = position.y - (fontSize + marginSmall)
	page.drawText(title, {
		x: position.x,
		y: titleYPosition,
		size: fontSize,
		maxWidth,
		...titleStyle
	})
	info.height += fontSize + marginSmall
	const bodyPosition = titleYPosition - (fontSize + marginSmall)
	page.drawText(body, {
		x: position.x,
		y: bodyPosition,
		size: fontSize,
		...bodyStyle
	})
	info.height += fontSize + marginSmall
	return info
}

interface ContactProperties {
	page: PDFPage
	data: CVContact
	language: Language
	titleStyle: Omit<PDFPageDrawTextOptions, 'x' | 'y'>
	bodyStyle: Omit<PDFPageDrawTextOptions, 'x' | 'y'>
	position: {
		x: number
		y: number
	}
}

function drawContact({
	data,
	page,
	position,
	language,
	bodyStyle,
	titleStyle
}: ContactProperties): ComponentInfo {
	const info: ComponentInfo = {
		height: 0,
		width: 0,
		x: position.x,
		y: position.y
	}
	page.drawText(languageMessage.contact[language], {
		x: position.x,
		y: position.y,
		size: titleExperienceFontSize,
		...titleStyle
	})
	info.height += titleExperienceFontSize
	let index = 1
	for (const [key, value] of Object.entries<string>(
		data as unknown as Record<string, string>
	)) {
		if (bodyStyle.font === undefined) {
			throw new Error('bodyStyle.font is undefined')
		}
		// TODO: handle multiline
		const content = layoutMultilineText(`${key}: ${value}`, {
			alignment: TextAlignment.Left,
			font: bodyStyle.font,
			bounds: {
				x: position.x,
				y: position.y - index * (4 + baseFontSize),
				width: maxSecondRowWidth,
				height: baseFontSize
			},
			fontSize: baseFontSize
		})
		for (const line of content.lines) {
			page.drawText(line.text, {
				x: line.x,
				y: line.y,
				size: bodyStyle.size,
				...bodyStyle
			})
			info.height += line.height + 4
		}
		index += content.lines.length
	}

	return info
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function createPageLinkAnnotation(page: PDFPage, uri: string) {
	return page.doc.context.register(
		page.doc.context.obj({
			Type: 'Annot',
			Subtype: 'Link',
			Rect: [0, 30, 40, 230],
			Border: [0, 0, 2],
			C: [0, 0, 1],
			A: {
				Type: 'Action',
				S: 'URI',
				URI: PDFString.of(uri)
			}
		})
	)
}

function drawListItem<T>({
	data,
	page,
	renderItem,
	position,
	language,
	itemSpacing,
	bodyStyle,
	titleStyle
}: DataListsProperties<T>): ComponentInfo {
	const info: ComponentInfo = {
		height: 0,
		width: 0,
		x: position.x,
		y: position.y
	}
	let index = 0
	let perviewHeight = 0
	for (const item of data.slice(0, 3)) {
		const itemPosition = {
			x: position.x,
			y: position.y - index * (itemSpacing + perviewHeight)
		}
		// const pageInfo = drawItem({
		// 	page,
		// 	titleStyle,
		// 	position: itemPosition,
		// 	bodyStyle,
		// 	data: item
		// })
		const pageInfo = renderItem({
			page,
			titleStyle,
			language,
			position: itemPosition,
			bodyStyle,
			data: item
		})
		// console.log(pageInfo.y, pageInfo.height)
		info.height += itemSpacing + pageInfo.height
		perviewHeight = pageInfo.height
		index += 1
	}
	// console.log(info.height)
	// console.log('end of list')
	return info
}
