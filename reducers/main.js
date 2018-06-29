import { SAVE_SCHEDULE, LOAD_GAME, SAVE_PROBABLE_STARTERS, REQUEST_SCHEDULE } from '../types/main'
import { combineReducers } from 'redux'

const initState = {
	proGames: []
}

const schedule = (state = { 
		proGames: [],		// list of (soon to be) distinct progames for the day
		game: undefined,	// the currently in view game
		requestedGames: false,
	}, action) => {
	switch (action.type) {
		case REQUEST_SCHEDULE:
			// Set a flag upon initial request of the schedule to make sure we dont' request it again
			return Object.assign({}, state, {
				requestedGames: true
			})
		case SAVE_SCHEDULE:
			// Save the daily schedule once it's been fetched
			return Object.assign({}, state, {
				proGames: action.games,
			})
		case LOAD_GAME:
			// Pulls a game from the proGames, hope you've got proGames.
			const gameId = action.gameId
			return Object.assign({}, state, {
				// This creates a reference to the game, which is rad for reading,
				// but, you have to write any changes to the og game in proGames or, wtf
				// was any of this even for?!??!?!?!??! :creed: :scuba:
				game: state.proGames.find((x) => x['game_pk'] === gameId)
			})
		case SAVE_PROBABLE_STARTERS:
			// Save the probable starters to the original game element
			const proGames = state.proGames.slice(0)
			const game = proGames.find((x) => x['game_pk'] === action.gameId)
			game.starters = action.starters
			return Object.assign({}, state, {
				proGames: proGames
			})
		default:
			return state
	}
}

const game = (state = { }, action) => {
	switch (action.type) {		default:
			return state
	}
}

const reducer = combineReducers({
	schedule,
	game,
})
// to do move this off of multiple reducers, it's dumb  game reducer is hot fat garbage
export default reducer
