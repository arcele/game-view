import { SAVE_SCHEDULE, LOAD_GAME, SAVE_PROBABLE_STARTERS, REQUEST_SCHEDULE, SAVE_PITCHER_DETAILS, SAVE_BVP_DATA, SAVE_BETTING_ODDS } from '../types/main'
import { combineReducers } from 'redux'

const initState = {
	proGames: []
}

const schedule = (state = {
		proGames: [],		// list of (soon to be) distinct progames for the day
		game: undefined,	// the currently in view game
		requestedGames: false,
	}, action) => {
	let proGames;


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
			proGames = action.games.filter((g, i) =>
				(action.games.findIndex((h) => (h.game_pk == g.game_pk)) == i)
			).map((g) => {
				return buildProGameObject(g)
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
					data: action.data.row
				})
			}
			if(game.starters.away.id === action.pitcher) {
				starters.away = Object.assign({}, game.starters.away, {
					data: action.data.row
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
			game.bvpDataLoaded = true;
			return Object.assign({}, state, {
				game
			})
		case SAVE_BETTING_ODDS:
			proGames = [...state.proGames]
			let today = new Date()
			action.odds.data.map((matchup) => {
				proGames.map((proGame) =>{
					if(proGame.homeTeam.full === matchup.home_team) {
						// home team match
						let matchupDate = new Date(matchup.commence_time * 1000)
						if(matchupDate.getDate() === today.getDate() &&
							matchupDate.getMonth() === matchupDate.getMonth()) {
								// home team match AND day of game match
								// TODO make this more flexible to accept whatever date we're viewing
								// TODO support double headers

								let avgOdds = averageOdds(matchup.sites),
										euroOdds = avgOdds.eur,
										usOdds = avgOdds.us,
										homeIdx = matchup.teams[0] == proGame.homeTeam.full ? 0 : 1,
										awayIdx = matchup.teams[0] == proGame.awayTeam.full ? 0 : 1;

								// save 'em on the proGame
								proGame.homeTeam.odds = {
									us: usOdds[homeIdx],
									eur: euroOdds[homeIdx],
									sites: matchup.sites.map((m) => Object.assign({}, m, {
										odds: {
											eur: m.odds.h2h[homeIdx],
											us: euroOddToUsOdd(m.odds.h2h[homeIdx])
										}
									}))
								};
								proGame.awayTeam.odds = {
									us: usOdds[awayIdx],
									eur: euroOdds[awayIdx],
									sites: matchup.sites.map((m) => Object.assign({}, m, {
										odds: {
											eur: m.odds.h2h[awayIdx],
											us: euroOddToUsOdd(m.odds.h2h[awayIdx])
										}
									}))
								}
							}
						}
					});
				});
			return Object.assign({}, state, {
				proGames
			})
		default:
			return state
	}
}

const averageOdds = (odds) => {
	let euroOdds = [
		(odds.reduce((a,b) => {
			return a.odds ? a.odds.h2h[0] : a + b.odds.h2h[0]
		}, 0) / odds.length)
		,
		(odds.reduce((a,b) => {
			return a.odds ? a.odds.h2h[1] : a + b.odds.h2h[1]
		}, 0) / odds.length)
	]
	let usOdds = new Array()
	// calculate these as us odds
	euroOdds.map((euroOdd, i) => {
		usOdds[i] = euroOddToUsOdd(euroOdd)
	})
	return ({'eur': euroOdds, 'us': usOdds})
}

const buildProGameObject = (gameData) => {
	let proGameObject = {},
			copyKeys = ['game_pk', 'game_date', 'game_time_et']; // all keys to be copied directly to the Object

	// console.log('initial data:', gameData)
	copyKeys.forEach((k) => (proGameObject[k] = gameData[k]))
	proGameObject.homeTeam = {
		id: gameData.home_team_id,
		abbrev: gameData.home_team_abbrev,
		short: gameData.home_team_short,
		full: gameData.home_team_full
	}
	proGameObject.awayTeam = {
		id: gameData.away_team_id,
		abbrev: gameData.away_team_abbrev,
		short: gameData.away_team_short,
		full: gameData.away_team_full,
	}
	return proGameObject
}

const euroOddToUsOdd = (euroOdd) => {
	return euroOdd >= 2.00 ? ('+' + Math.round((euroOdd - 1) * 100)) : (Math.round(-100 / (euroOdd - 1 )))
}

const unused = (state = { }, action) => {
	switch (action.type) {		default:
			return state
	}
}
// TODO: break the combiners up in an actual logial way ie : schedule/game
const reducer = combineReducers({
	schedule,
	unused,
})
// to do move this off of multiple reducers, it's dumb  game reducer is hot fat garbage
export default reducer
