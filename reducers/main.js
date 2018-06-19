import { SAVE_SCHEDULE, SAVE_GAME, SAVE_PROBABLE_STARTERS } from '../types/main'
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

const game = (state = { }, action) => {
	switch (action.type) {
		case SAVE_GAME:
			return Object.assign({}, state, 
				action.game.events.competitions[0]
			)
		case SAVE_PROBABLE_STARTERS:
			return Object.assign({}, state,
				{
					starters: action.starters,
				}
			)
		default:
			return state
	}
}

const reducer = combineReducers({
	schedule,
	game,
})

export default reducer
