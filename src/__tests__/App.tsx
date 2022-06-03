import { screen } from '@testing-library/react'
import App from 'App'
import renderWithProviders from 'testUtils'

describe('<App />', () => {
	it('renders', async () => {
		window.history.pushState({}, 'Home', '/')
		renderWithProviders(<App />, false)

		expect(screen.getByTestId('loader-element')).toBeInTheDocument()
		// await expect(screen.findByText('Apple')).resolves.toBeInTheDocument()
		// await userEvent.click(screen.getByText('Apple'))

		// expect(screen.getByTestId('loader-element')).toBeInTheDocument()
		// await expect(
		// 	screen.findByText('Vitamins per 100 g (3.5 oz)')
		// ).resolves.toBeInTheDocument()
	})
})
