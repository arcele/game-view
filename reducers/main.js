import { SAVE_SCHEDULE, LOAD_GAME, SAVE_PROBABLE_STARTERS, REQUEST_SCHEDULE, SAVE_BVP_DATA } from '../types/main'
import { combineReducers } from 'redux'

const initState = {
	proGames: []
}

const schedule = (state = { 
		proGames: [],		// list of (soon to be) distinct progames for the day
		game: undefined,	// the currently in view game
		requestedGames: false,
	}, action) => {
	
	// Simple function to grab a game by id from the list of proGames
	const getGame = (gameId) => (
		state.proGames.find(g => g['game_pk'] === gameId)
	)

	// Return the currently loaded game
	const getCurrentGame = () => (
		getGame(state.game['game_pk'])
	)

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
				game: getGame(gameId)
			})
		case SAVE_PROBABLE_STARTERS:
			// Save the probable starters to the original game element
			const proGames = state.proGames.slice(0)
			let game = getGame(action.gameId)
			game.starters = action.starters
			return Object.assign({}, state, {
				proGames
			})
		case SAVE_BVP_DATA:
			// Save the BVP data to the state
			game = getCurrentGame()
			console.log('saving for game, okay? :', game)
			if(game.starters && game.starters.home === action.pitcher) {
				game.starters['home_pitcher_bvp'] = action.data.team_bvp_5y.queryResults.row
			}
			if(game.starters && game.starters.away === action.pitcher) {
				game.starters['away_pitcher_bvp'] = action.data.team_bvp_5y.queryResults.row
			}
			return Object.assign({}, state, {
				game
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
