/* eslint-disable @typescript-eslint/no-magic-numbers */
import { createStyles } from '@mantine/core'

const useAppStyles = createStyles(theme => ({
	text: {
		color:
			theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.gray[8]
	},
	titleDecorate: {
		color:
			theme.colorScheme === 'dark'
				? theme.colors.gray[0]
				: theme.colors.gray[8],
		span: {
			color: theme.colors[theme.primaryColor][5]
		},
		[theme.fn.smallerThan('md')]: {
			textAlign: 'center'
		}
	},
	title: {
		textAlign: 'center',
		color:
			theme.colorScheme === 'dark'
				? theme.colors.gray[0]
				: theme.colors.gray[8],
		marginBottom: theme.spacing.xl,
		span: {
			color: theme.colors[theme.primaryColor][5]
		}
	},
	blogCard: {
		cursor: 'pointer',
		color:
			theme.colorScheme === 'dark'
				? theme.colors.gray[0]
				: theme.colors.gray[8],
		'.title': {
			minHeight: 60
		},
		'.content': {
			minHeight: 74
		},
		'.divider': {
			width: '100%',
			height: 5,
			backgroundColor: theme.colors[theme.primaryColor][5]
		},
		'&:hover .shine': {
			color: theme.colors[theme.primaryColor][5]
		}
	},
	divider: {
		width: '100%',
		height: 5,
		backgroundColor: theme.colors[theme.primaryColor][5]
	}
}))

export default useAppStyles
