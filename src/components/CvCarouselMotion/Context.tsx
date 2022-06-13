import type { MantineStyleSystemProps } from '@mantine/core'
import type { Dispatch, PropsWithChildren, ReactElement, Reducer } from 'react'
import { createContext, useMemo, useReducer } from 'react'

interface State {
	items: number[]
	activeItem: number
}

interface AddAction {
	type: 'ADD_ITEM'
	index: number
	item: number
}
interface SetActive {
	type: 'SET_ACTIVE_ITEM'
	activeItem: number
}

export interface CarouselContextProperties {
	state: State
	dispatch: Dispatch<AddAction | SetActive>
}

export const Context = createContext({} as CarouselContextProperties)

export function ContextProvider({
	children
}: PropsWithChildren<MantineStyleSystemProps>): ReactElement {
	const ADD_ITEM = 'ADD_ITEM'
	const SET_ACTIVE_ITEM = 'SET_ACTIVE_ITEM'

	const initialState = {
		items: [],
		activeItem: 0
	}

	const [state, dispatch] = useReducer<Reducer<State, AddAction | SetActive>>(
		(state_, action) => {
			switch (action.type) {
				case ADD_ITEM:
					// eslint-disable-next-line no-case-declarations
					const items = [...state_.items]
					items[action.index] = action.item
					return {
						...state_,
						items
					}
				case SET_ACTIVE_ITEM:
					return {
						...state_,
						activeItem: action.activeItem
					}
				default:
					return initialState
			}
		},
		initialState
	)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const foo = useMemo(() => ({ state, dispatch }), [state, dispatch])
	return (
		<Context.Provider
			// eslint-disable-next-line react/jsx-no-constructed-context-values
			value={foo}
		>
			{children}
		</Context.Provider>
	)
}
