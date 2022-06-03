import { render, screen } from '@testing-library/react'
import LoadingOrError from '../LoadingOrError'

describe('<LoadingOrError />', () => {
	it('renders', () => {
		render(<LoadingOrError />)

		expect(screen.getByTestId('loader-element')).toBeInTheDocument()
	})
	it('renders with an error message', async () => {
		render(<LoadingOrError error={new Error('Failed to fetch')} />)
		const selector = screen.getByTestId('error-title-element')

		expect(selector).toHaveTextContent('Failed to fetch')
	})
})
