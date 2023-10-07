export const IconSize = 24 // in px

// Language
export const DefaultLanguage = 'en'

// more highest number mean hightest saturation
export const ColorLevel1 = 1
export const ColorLevel2 = 2
export const ColorLevel3 = 3
export const ColorLevel4 = 4
export const ColorLevel5 = 5 // base color
export const ColorLevel6 = 6
export const ColorLevel7 = 7
export const ColorLevel8 = 8
export const ColorLevel9 = 9
export const BlurHashSize = 32
export const BlurHashEncodeSize = 4

// Screen Sizes
export const ScreenSizeUS = 340 // in px
export const ScreenSizeXS = 576 // in px
export const ScreenSizeSM = 768 // in px
export const ScreenSizeMD = 992 // in px
export const ScreenSizeLG = 1200 // in px
export const ScreenSizeXL = 1400 // in px

export const GoldenRatio = 1.618_033_988_75

export const MeetDuration = 15 // in minutes
export const SubstractOneDay = 100_000_000 // in seconds
// network status
export const HttpNotFound = 404

export const SupabaseProjectUrl = 'https://nhuqyhywqzzfywwjkhtp.supabase.co'
export const SupabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5odXF5aHl3cXp6Znl3d2praHRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTY1ODM3ODMsImV4cCI6MTk3MjE1OTc4M30.cvaNVP1n-sTGIJfL4Q617rCdXr3zXa0UQKWt3MIxUoc'

// Column per row
export const ColumnMD = 3 // in px
export const ColumnSM = 2 // in px
export const ColumnXS = 1 // in px

export const Languages = ['en-US', 'id-ID'] as const
// eslint-disable-next-line @typescript-eslint/no-type-alias
export type TypeLanguages = typeof Languages[number]
export interface IChoiceItem {
	flag: string
	name: string
	value: TypeLanguages
	label: string
}
export const LanguageChoice: IChoiceItem[] = [
	{
		flag: 'indonesia_flag.svg',
		name: 'Bahasa Indonesia',
		value: Languages['1'],
		label: 'Bahasa Indonesia'
	},
	{
		flag: 'united-states_flag.svg',
		name: 'English',
		value: Languages['0'],
		label: 'English'
	}
]
// Data Model
export const FirstPage = 1
export const PageSize = 5
export const PageSizeMax = 100
export const PageSizeMin = 1
export const CountMargin = 1
export const HttpOK = 200
export const HttpInternalServerError = 500

export const ProductListEndpoint = '/api/products'
