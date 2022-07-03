/* eslint-disable import/prefer-default-export */
import * as blurhash from 'blurhash'
import fm from 'front-matter'
import yaml from 'js-yaml'
import { chunk } from 'lodash'
import { createWriteStream, existsSync, mkdirSync, unlink } from 'node:fs'
import fs from 'node:fs/promises'
import request from 'node:http'
import path from 'node:path'
import sharp from 'sharp'
import {
	BlurHashEncodeSize,
	BlurHashSize,
	CountMargin,
	PageSize,
	ScreenSizeLG,
	ScreenSizeMD,
	ScreenSizeSM,
	ScreenSizeUS,
	ScreenSizeXL,
	ScreenSizeXS
} from './constant'

const IndentSize = 2

export interface ImageInfo {
	filename: string
	hash: string
	sources: string[]
}

export interface FileInfo<T> {
	attributes: T
	body: string
}

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type MarkdownInfo<T> = T & { link: string }

function isImage(file: string): boolean {
	const extension = path.extname(file)
	return extension === '.jpg' || extension === '.png'
}

export async function blurImage(imagePath: string): Promise<string> {
	return new Promise((resolve, reject) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		sharp(imagePath)
			.raw()
			.ensureAlpha()
			.resize(BlurHashSize, BlurHashSize, { fit: 'inside' })
			.toBuffer((error, buffer, { width, height }) => {
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				if (error !== null) {
					reject(error)
					return
				}
				resolve(
					blurhash.encode(
						// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
						new Uint8ClampedArray(buffer),
						// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
						width,
						// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
						height,
						BlurHashEncodeSize,
						BlurHashEncodeSize
					)
				)
			})
	})
}

export async function scaleImage(
	pathname: string,
	boundary: number
): Promise<Buffer> {
	const image = sharp(path.resolve(pathname))
	const info = await image.metadata()
	const { width: imageWidth, height: imageHeight } = info
	if (imageWidth === undefined) {
		throw new Error('image width is undefined')
	}
	if (imageHeight === undefined) {
		throw new Error('image height is undefined')
	}

	if (imageWidth <= boundary && imageHeight <= boundary) {
		return image.toBuffer()
	}
	const ratio = imageWidth / imageHeight
	const resizeWidth = Math.min(boundary, imageWidth)
	const resizeHeight = Math.min(boundary, imageHeight)
	const resizeRatio = resizeWidth / resizeHeight
	if (ratio >= resizeRatio) {
		return (
			image
				.resize(resizeWidth)
				// .toFile(path.resolve(pathname))
				.toBuffer()
		)
	}
	return image.toBuffer()
}

export async function mapImage(
	file: string,
	outDirectory: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any[]> {
	const sizes = [
		ScreenSizeUS,
		ScreenSizeXS,
		ScreenSizeSM,
		ScreenSizeMD,
		ScreenSizeLG,
		ScreenSizeXL
	]
	const scaleJobs: Promise<string>[] = []

	for (const size of sizes) {
		const filename = `${size}px-${path.basename(file)}`
		const outputPath = path.resolve(
			outDirectory || path.dirname(file),
			filename
		)
		const sourcePath = path.resolve(file)
		scaleJobs.push(
			scaleImage(sourcePath, size).then(
				async buffer =>
					new Promise((resolve, reject) => {
						sharp(buffer).toFile(outputPath, error => {
							// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
							if (error !== null) {
								reject(error)
								return
							}
							resolve(filename)
						})
					})
			)
		)
	}
	return Promise.all(scaleJobs)
}

export async function compileImage(
	pathname: string,
	output: string
): Promise<ImageInfo> {
	const filename = path.basename(pathname)
	const blurHash = await blurImage(pathname)
	const sources = await mapImage(pathname, output)

	const imageInfo = { filename, hash: blurHash, sources }

	await fs.writeFile(
		path.resolve(output, `${filename}.json`),
		JSON.stringify(imageInfo, undefined, IndentSize)
	)

	return imageInfo
}

export async function compileImages(
	pathname: string,
	output: string
): Promise<ImageInfo[]> {
	const files = await fs.readdir(pathname)
	const jobs: Promise<ImageInfo>[] = []
	for (const filename of files) {
		const filePath = path.join(pathname, filename)
		// eslint-disable-next-line no-await-in-loop
		const fileStat = await fs.stat(filePath)
		const filepath = path.resolve(pathname, filename)
		if (existsSync(filepath) && fileStat.isFile() && isImage(filename)) {
			jobs.push(compileImage(filepath, output))
		}
	}
	return Promise.all(jobs)
}

export function textReadTime(text: string): number {
	const wpm = 225
	const minute = 60
	const initReadTime = 1
	const words = text.trim().split(/\s+/).length
	const time = Math.ceil(words / wpm)
	if (time === 0) {
		return initReadTime
	}
	if (time > minute) {
		return time / minute
	}
	return time
}

// download image from internet and save it to disk
export async function downloadImage(
	url: string,
	filePath: string
): Promise<void> {
	return new Promise((resolve, reject) => {
		const file = createWriteStream(filePath)
		request
			.get(url, response => {
				response.pipe(file)
				file.on('finish', () => {
					file.close()
					resolve()
				})
			})
			.on('error', error => {
				unlink(filePath, () => {
					reject(error)
				})
			})
	})
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function compileMarkdown<T = any>(
	file: string,
	fileName: string,
	outputDirectory: string,
	modifier?: (attributes: T, body: string, outputDirectory: string) => T
): Promise<FileInfo<T>> {
	const fileRaw = await fs.readFile(file, 'utf8')
	const { attributes, body } = fm<T>(fileRaw)
	const finalAttributes = modifier
		? modifier(attributes, body, outputDirectory)
		: attributes
	const nameFile = fileName.split('.')[0]
	await fs.writeFile(
		path.join(outputDirectory, `${nameFile}.json`),
		JSON.stringify(
			{
				attributes: finalAttributes,
				body
			},
			undefined,
			IndentSize
		),
		'utf8'
	)

	return { attributes: finalAttributes, body }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function compileYaml<T = any>(
	file: string,
	fileName: string,
	outputDirectory: string,
	modifier?: (attributes: T, body: string, outputDirectory: string) => T
): Promise<FileInfo<T>> {
	const fileRaw = await fs.readFile(file, 'utf8')
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	const data = yaml.load(fileRaw) as T
	const finalAttributes = modifier ? modifier(data, '', outputDirectory) : data
	const nameFile = fileName.split('.')[0]
	await fs.writeFile(
		path.join(outputDirectory, `${nameFile}.json`),
		JSON.stringify(data, undefined, IndentSize),
		'utf8'
	)

	return { attributes: finalAttributes, body: '' }
}

export async function writeFile<T>(
	location: string,
	directory: string,
	content: T | Uint8Array
): Promise<void> {
	await (content instanceof Uint8Array
		? fs.writeFile(path.join(directory, location), content)
		: fs.writeFile(
				path.join(directory, location),
				JSON.stringify(content, undefined, IndentSize),
				'utf8'
		  ))
}

export function findOrCreateDirectory(directory: string): void {
	if (!existsSync(directory)) {
		mkdirSync(directory, { recursive: true })
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function compileMarkdowns<T = any>(
	pathname: string,
	output: string,
	modifier?: (attributes: T, body: string, outputDirectory: string) => T,
	sorter?: (previous: T, next: T) => number,
	onSavedIndex?: (files: MarkdownInfo<T>[], directory: string) => void,
	indexes?: string[]
): Promise<void> {
	const files = await fs.readdir(pathname)
	const items = [] as MarkdownInfo<T>[]
	const promises = files.map(async filename => {
		const filePath = path.join(pathname, filename)
		const fileStat = await fs.stat(filePath)
		findOrCreateDirectory(output)
		if (fileStat.isDirectory()) {
			await compileMarkdowns(
				filePath,
				path.join(output, filename),
				modifier,
				sorter,
				onSavedIndex,
				indexes
			)
		} else if (fileStat.isFile()) {
			const fileExtension = path.extname(filePath)
			// check file extension is markdown
			if (fileExtension === '.md') {
				const result = await compileMarkdown<T>(
					filePath,
					filename,
					output,
					modifier
				)
				const link = filename.split('.')[0]
				items.push({
					...result.attributes,
					link
				})
			}
			// check file extension is yaml
			if (fileExtension === '.yaml' || fileExtension === '.yml') {
				await compileYaml<T>(filePath, filename, output, modifier)
			}
		}
	})

	// write items to index.json file
	await Promise.all(promises).then(async () => {
		try {
			if (items.length === 0) {
				return
			}
			if (sorter) {
				items.sort(sorter)
			}
			for (const [index, item] of chunk(items, PageSize).entries()) {
				const data = new Uint8Array(
					Buffer.from(JSON.stringify(item, undefined, IndentSize))
				)
				void fs.writeFile(
					path.resolve(output, `index-page-${index + CountMargin}.json`),
					data
				)
			}
			onSavedIndex?.(items, output)
		} catch (error) {
			// When a request is aborted - err is an AbortError
			console.error(error)
		}
	})
}

export async function cleanDirectory(directory: string): Promise<void> {
	if (existsSync(directory)) {
		const files = await fs.readdir(directory)
		// remove all files and directory recrusive in directory
		await Promise.all(
			files.map(async filename => {
				const filePath = path.join(directory, filename)
				const fileStat = await fs.stat(filePath)
				if (fileStat.isFile()) {
					await fs.unlink(filePath)
				}
				if (fileStat.isDirectory()) {
					await cleanDirectory(filePath)
				}
			})
		)
	}
}
