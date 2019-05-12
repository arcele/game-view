import { SAVE_SCHEDULE, LOAD_GAME, SAVE_PROBABLE_STARTERS, REQUEST_SCHEDULE, SAVE_PITCHER_DETAILS, SAVE_BVP_DATA } from '../types/main'
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
		state.game ? getGame(state.game['game_pk']) : {}
	)

	const game = getCurrentGame() // use this to save stuff to the state

	switch (action.type) {
		case REQUEST_SCHEDULE:
			// Set a flag upon initial request of the schedule to make sure we dont' request it again
			return Object.assign({}, state, {
				requestedGames: true
			})
		case SAVE_SCHEDULE:
			// Remove dupes from and save the daily schedule once it's been fetched
			let proGames = action.games.filter((g) => {
				if(action.games.filter((h) => { return h.game_pk == g.game_pk }).length === 1) {
					// unique game, we cool
					return g
				} else {
					let firstMatch = action.games.find((h) => { return h.game_pk == g.game_pk })
					if(firstMatch.source_id === g.source_id) {
						// there's multiple, but, it's the first occurence
						return g
					}
				}
			})
			return Object.assign({}, state, {
				proGames
			})
		case LOAD_GAME:
			// Pulls a game from the proGames, hope you've got proGames.
			return Object.assign({}, state, {
				// This creates a reference to the game, which is rad for reading,
				// grab the game using the getGame utility function and save it here
				// to update the actual proGame
				game: getGame(action.gameId)
			})
		case SAVE_PROBABLE_STARTERS:
			// Save the probable starters to the original game element
			game.starters = action.starters
			return Object.assign({}, state, {
				game
			})
		case SAVE_PITCHER_DETAILS:
			// Save details about the pitcher fetched from the espn api onto the starters object
			let starters = Object.assign({}, game.starters, {})
			if(game.starters.home.id === action.pitcher) {
				starters.home = Object.assign({}, game.starters.home, {
					data: action.data
				})
			}
			if(game.starters.away.id === action.pitcher) {
				starters.away = Object.assign({}, game.starters.away, {
					data: action.data
				})
			}
			game.starters = starters
			return Object.assign({}, state, {
				game
			})
		case SAVE_BVP_DATA:
			// Save the BVP data to the state
			let data = action.data.team_bvp_5y.queryResults.row
				.filter((row) => { if(row.b_tpa) { return row } }) // only results with plate appearances
				.sort((x,y) => { return (y.b_tpa - x.b_tpa) })     // sort by plate app. decending
			game[(game.starters && game.starters.home.id === action.pitcher) ? 'home_pitcher_bvp' : 'away_pitcher_bvp'] = data

			return Object.assign({}, state, {
				game
			})
		default:
			return state
	}
}

const unused = (state = { }, action) => {
	switch (action.type) {		default:
			return state
	}
}

const reducer = combineReducers({
	schedule,
	unused,
})
// to do move this off of multiple reducers, it's dumb  game reducer is hot fat garbage
export default reducer
