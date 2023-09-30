#!/usr/bin/env ts-node node_modules/typescript/bin/tsc --project tsconfig.cli.json

import type { IBaseData, IProjectList } from 'api'
import commander from 'commander'
import { version } from '../package.json'
import {
	cleanDirectory,
	compileImage,
	compileImages,
	compileMarkdown,
	compileMarkdowns,
	downloadImage,
	textReadTime,
	writeFile
} from './content'
import type { CVProperties } from './cvUtils'
import { createCVPdf } from './cvUtils'

const program = new commander.Command()

program.version(version).option('--first').option('-s, --separator <char>')

program.command('hello <name>', { isDefault: true }).action(() => {
	const options = program.opts()
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const limit = options.first ? 1 : undefined
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const argument = program.args[0]
	if (argument) {
		console.log(argument.split(String(options.separator), limit))
	}
})

program
	.command('image <file>')
	.option('-d, --dir', 'is looking at directory')
	.option('-o,--out-dir <outdir>', 'set output directory')
	.description('convert image to base64')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	.action((file: string, { outDir, dir }: { outDir: string; dir: boolean }) => {
		const imageLoader = dir ? compileImages : compileImage
		imageLoader(file, outDir)
			.then(() => {
				console.log('done 🎉')
			})
			.catch(error => {
				console.error(error)
			})
	})

program
	.command('download <url> <file>')
	.description('download image from internet and save it to disk')
	.action((url: string, file: string) => {
		void downloadImage(url, file)
	})
program
	.command('makecv')
	.option('-o,--out-dir <outdir>', 'set output directory')
	.description('make cv')
	.action(async ({ outDir }: { outDir: string }) => {
		const cv: CVProperties = {
			avatar: 'https://avatars.githubusercontent.com/u/11344981?v=4',
			name: 'devbox',
			background: 'https://i.ibb.co/mhTvXNw/cv-bg.png',
			birthdate: new Date('1995-08-01T05:31:32.099Z'),
			contact: {
				address:
					'Jl. Denpasar - Gilimanuk, Kec.Pekutatn, Bali, Indonesia 82262',
				phone: '+6283115541165',
				email: 'adi_gunawan@live.com',
				github: '@zgunz42',
				instagram: '@adi.bite',
				linkedin: '@zgunz42'
			},
			jargon: 'Full-stack developer and IoT antusias.',
			educations: [
				{
					type: 'school',
					name: 'SMA Negeri 1 Pekutatan',
					startAt: new Date('2017-07-01T05:31:32.099Z'),
					graduationAt: new Date('2018-01-08T05:31:32.099Z'),
					location: 'Pekutatan, Bali, Indonesia',
					description:
						'Mempelajari ilmu komputer, mengambil jurusan \nIPA dan Mengikuti kompetisi MIPA seperti kimia\n'
				}
			],
			jobExperience: [
				{
					company: 'Bungamata',
					location: 'Dalung, Bali',
					position: 'Junior Software Engginer',
					startAt: new Date('2017-07-01T05:31:32.099Z'),
					endAt: new Date('2018-01-08T05:31:32.099Z'),
					description:
						'Membuat template wordpress, mengembangkan \nplatform marketplace jual beli gambar, membuat aplikasi \nuntuk feedback pengunjung hotel berupa rating\n'
				},
				{
					company: 'Sindata',
					location: 'DKI Jakarta',
					position: 'Remote Front End Develope',
					startAt: new Date('2020-03-01T05:31:32.099Z'),
					endAt: new Date('2020-11-08T05:31:32.099Z'),
					description:
						'Transisi frontend dari yang sebelumnnya menggunakan \nlibrary react js menjadi vuejs dengan menggunakan \nframework quasar\n'
				}
			],
			projects: [
				{
					name: 'Android Hot Movie',
					description:
						'Aplikasi menampikan list movie diambail dari API IMDB\n',

					link: 'https://github.com/zgunz42/hot-movie',
					subtitle: 'personal project'
				},
				{
					name: 'EggBox IoT',
					description:
						'Monitor suhu dan perputaran incubator menggunakan \nperangkat IoT(NodeMCU) dan server(Nestjs) melalui \nmosquito\n',

					link: 'https://github.com/zgunz42/egg-incubator-iot',

					subtitle: 'personal project'
				},
				{
					name: 'Pawiwahan Website',
					description: 'Website undangan acara pernikahan online sederhana\n',

					link: 'http://pawiwahan.netlify.app',

					subtitle: 'personal project'
				},
				{
					name: 'E-Balian Chatboot',
					description:
						'Chatbot hari baik Hindu menggunakan data di scrap online\n',
					link: 'https://t.me/@ibalian_bot',
					subtitle: 'personal project'
				},
				{
					name: 'Otonan Website',
					description:
						'Undangan digital otonan (hari lahir bali) dengan fitur ucapan\nserta hitung mundur\n',
					link: 'http://otonan.netlify.app',
					subtitle: 'personal project'
				},
				{
					name: 'Svelte SlideIT',
					description:
						'Sebuah libaray svelte untuk membuat slider atau carousel\n',
					link: 'https://github.com/zgunz42/svelte-slideit',
					subtitle: 'personal project'
				}
			],
			skills: [
				{
					name: 'Frontend Web Development',
					techs: ['react', 'css', 'html', 'js']
				},
				{
					name: 'Backend Web Development',
					techs: ['node', 'express', 'mongodb', 'mysql']
				},
				{
					name: 'Devops',
					techs: ['docker', 'kubernetes', 'aws']
				},
				{
					name: 'Database',
					techs: ['mongodb', 'mysql']
				},
				{
					name: 'Other',
					techs: ['git', 'github', 'gitlab', 'bitbucket']
				}
			],
			spokenLanguages: [
				{
					name: 'Bahasa Indonesia',
					level: 'Native'
				},
				{
					name: 'Bahasa Inggris',
					level: 'Advanced'
				}
			]
		}
		const data = await createCVPdf(cv)

		await writeFile(`cv.pdf`, outDir, data)
	})
program
	.command('compile <file>')
	.option('-fn, --filename [filename]', 'compiled file name')
	.option('-d, --dir', 'is looking at directory')
	.option('-o,--out-dir [outdir]', 'set output directory')
	.description('compile markdown frontmatter to json object')
	.action(
		async (
			file: string,
			{
				filename,
				outDir,
				dir
			}: { filename: string; outDir: string; dir: boolean }
		) => {
			if (!outDir.includes('public')) {
				throw new Error('outDir must be public')
			}
			const outputDirectory = String(outDir) || './'
			await cleanDirectory(outputDirectory)
			// eslint-disable-next-line unicorn/prefer-ternary
			if (dir) {
				await compileMarkdowns<IBaseData>(
					file,
					outputDirectory,
					(attributes, body, fileDirectory) => {
						if (fileDirectory.includes('articles')) {
							// eslint-disable-next-line @typescript-eslint/no-unsafe-return
							return {
								...attributes,
								readTime: textReadTime(body)
							}
						}

						// eslint-disable-next-line @typescript-eslint/no-unsafe-return
						return attributes
					},
					(preview, next): number => {
						// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
						if (preview.publishedAt && next.publishedAt) {
							// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
							const previewDate = new Date(String(preview.publishedAt))
							// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
							const nextDate = new Date(String(next.publishedAt))
							// eslint-disable-next-line @typescript-eslint/no-magic-numbers
							return previewDate > nextDate ? -1 : 1
						}
						return 0
					},
					(items, fileDirectory) => {
						if (fileDirectory.includes('projects')) {
							const pinnedProjects = (
								items as unknown as IProjectList[]
							).filter(it => it.pinned)
							void writeFile(`index-pinned.json`, fileDirectory, pinnedProjects)
						}
						return items
					}
				)
			} else {
				await compileMarkdown(
					String(file),
					String(filename),
					outputDirectory,
					(attributes, body, fileDirectory) => {
						if (fileDirectory.includes('articles')) {
							// eslint-disable-next-line @typescript-eslint/no-unsafe-return
							return {
								...attributes,
								readTime: textReadTime(body)
							}
						}
						// eslint-disable-next-line @typescript-eslint/no-unsafe-return
						return attributes
					}
				)
			}
		}
	)
program.parse(process.argv)
