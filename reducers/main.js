import { SAVE_SCHEDULE } from '../types/main'
import { combineReducers } from 'redux'

const initState = {
	proGames: []
}

const schedule = (state = { proGames: [] }, action) => {
	switch (action.type) {
		case SAVE_SCHEDULE:
			return Object.assign({}, state, {
				proGames: action.games,
			})
		default:
			return state
	}
}

const reducer = combineReducers({
	schedule,
})

export default reducer
