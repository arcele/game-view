import { SAVE_SCHEDULE, LOAD_GAME, SAVE_GAME_DATA, REQUEST_SCHEDULE, SAVE_PITCHER_DETAILS, SAVE_BVP_DATA, SAVE_BETTING_ODDS, SET_SCHEDULE_DATE, LOAD_ODDS_FROM_LOCAL_STORAGE, LOAD_ODDS_FROM_STATE, SAVE_STANDINGS } from '../types/main'
import { combineReducers } from 'redux'
import moment from 'moment'

const initState = {
	proGames: []
}
const standings = (state = {
		103: [],
		104: [],
	}, action) => {
		switch (action.type) {
			case SAVE_STANDINGS:
				let standings = Object.assign({}, state, {})
				standings[action.league] = action.standings.records;
				return standings
			default:
				return state;
		}
}

const schedule = (state = {
		proGames: [],		// list of (soon to be) distinct progames for the day
		game: undefined,	// the currently in view game
		requestedGames: false,
		player: {},
	}, action) => {
	let proGames;


	// Simple function to grab a game by id from the list of proGames
	const getGame = (gameDate, gameId) => {
		return(state[gameDate].find(g => g.gamePk == gameId))
	}

	// Return the currently loaded game
	const getCurrentGame = () => (
		state.game ? getGame(state.scheduleDate, state.game.gamePk) : {}
	)

	const game = getCurrentGame() // use this to save stuff to the state

	switch (action.type) {
		case REQUEST_SCHEDULE:
			// Set a flag upon initial request of the schedule to make sure we dont' request it again
			return Object.assign({}, state, {
				requestedGames: true
			})
		case SAVE_SCHEDULE:
			let scheduleDate = action.date;
			proGames = action.games.map((g) => {
				return buildProGameObject(g)
			})
			let ret = Object.assign({}, state, {
				scheduleDate
			})
			ret[scheduleDate] = proGames;
			return ret
		case 'SET_SCHEDULE_DATE':
			return Object.assign({}, state, {
				scheduleDate: action.date
			})
		case LOAD_GAME:
			return Object.assign({}, state, {
				// This creates a reference to the game, which is rad for reading,
				game: getGame(state.scheduleDate, action.gameId)
			})
		case SAVE_GAME_DATA:
			// Save data from the boxscore API which includes players, probables, and player season stats
			let players = action.game && action.game.gameData && action.game.gameData.players
			let probables = action.game && action.game.gameData && action.game.gameData.probablePitchers
			let boxscore = action.game && action.game.liveData && action.game.liveData.boxscore
			game.awayTeam.starter = players && players["ID" + (probables && probables.away && probables.away.id)]
			game.awayTeam.starter.stats = boxscore.teams.away.players["ID" + (probables && probables.away && probables.away.id)].seasonStats.pitching
			game.awayTeam.lineup = boxscore.teams.away.batters
			game.awayTeam.players = boxscore.teams.away.players
			game.homeTeam.starter = players && players["ID" + (probables && probables.home && probables.home.id)]
			game.homeTeam.starter.stats = boxscore.teams.home.players["ID" + (probables && probables.home && probables.home.id)].seasonStats.pitching
			game.homeTeam.lineup = boxscore.teams.home.batters
			game.homeTeam.players = boxscore.teams.home.players
			game.players = players
			return Object.assign({}, state, {
				game
			})
		case SAVE_PITCHER_DETAILS:
			// Save details about the pitcher fetched from the espn api onto the starters object
			let homeTeam = Object.assign({}, game.homeTeam),
					awayTeam = Object.assign({}, game.awayTeam)

			if(homeTeam.starter.id === action.pitcher) {
				homeTeam.starter = Object.assign({}, homeTeam.starter, {
					data: action.data.row
				})
				game.homeTeam = homeTeam
			}
			if(awayTeam.starter.id === action.pitcher) {
				awayTeam.starter = Object.assign({}, awayTeam.starter, {
					data: action.data.row
				})
				game.awayTeam = awayTeam
			}
			return Object.assign({}, state, {
				game
			})
		case SAVE_BVP_DATA:
			// Save the BVP data to the state
			let data = action.data.team_bvp_5y.queryResults.row
				.filter((row) => { if(row.b_tpa) { return row } }) // only results with plate appearances
				.sort((x,y) => { return (y.b_tpa - x.b_tpa) })     // sort by plate app. decending
			game[(game.homeTeam && game.homeTeam.starter.id === action.pitcher) ? 'home_pitcher_bvp' : 'away_pitcher_bvp'] = data
			game.bvpDataLoaded = true;
			return Object.assign({}, state, {
				game
			})
		case LOAD_ODDS_FROM_STATE:
		case LOAD_ODDS_FROM_LOCAL_STORAGE:
		case SAVE_BETTING_ODDS:
			proGames = [...state[state.scheduleDate]]
			let today = new Date()
			action.odds.data.map((matchup) => {
				proGames.map((proGame) =>{
					if(proGame.homeTeam.full === matchup.home_team) {
						// home team match
						let matchupMoment = moment(new Date(matchup.commence_time * 1000))
						if(matchupMoment.format('YYYY-MM-DD') == state.scheduleDate) {
								// home team match AND day of game match
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
				ret = Object.assign({}, state, {
					oddsResult: action.odds
				})
				ret[state.scheduleDate] = proGames;
				if(action.type === SAVE_BETTING_ODDS) {
					// save odds call to local storage if we just fetched them.
					let oddsForStorage = Object.assign({}, action.odds, {
						requested: moment()
					})
					localStorage.setItem('oddsData-' + moment().format("YYYYMMDD"), JSON.stringify(oddsForStorage))
				} else if(action.type === LOAD_ODDS_FROM_LOCAL_STORAGE) {
					// show some kinda badge that says when we fetched the local storage odds
					ret.oddsFetchedAt = moment(action.odds.requested)
				}
				return ret

		case 'LOAD_PLAYER':
			// assumes that the player we're loading is in the game we have loaded, seems legit
			return Object.assign({}, state, {
				player: state.game.players["ID" + action.id]
			})
		default:
			return state
	}
}
const teams = (state = {
	// all teams indexed by team id
	}, action) => {
		let teams = Object.assign({}, state)
		switch(action.type) {
			case 'INIT_TEAM':
				teams[action.id] = {
					requested: true
				}
				return teams
			case 'SAVE_TEAM_SCHEDULE':
				teams[action.teamId] = action.schedule
				return teams
			default:
				return state
		}
}

const boxscores = (state = {
	// all boxscores indexed by game id
}, action) => {
	let boxscores = Object.assign({}, state)
	switch(action.type) {
		case 'SAVE_BOX_SCORE':
				boxscores[action.gameId] = action.boxScore
				return boxscores
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
			copyKeys = ['gamePk', 'gameDate', 'status']; // all keys to be copied directly to the Object

	copyKeys.forEach((k) => (proGameObject[k] = gameData[k]))
	proGameObject.homeTeam = {
		id: gameData.teams.home.team.id,
		full: gameData.teams.home.team.name,
		score: gameData.teams.home.score,
		record: gameData.teams.home.leagueRecord,
	}
	proGameObject.awayTeam = {
		id: gameData.teams.away.team.id,
		full: gameData.teams.away.team.name,
		score: gameData.teams.away.score,
		record: gameData.teams.away.leagueRecord,
	}

	return proGameObject
}

const euroOddToUsOdd = (euroOdd) => {
	return euroOdd >= 2.00 ? ('+' + Math.round((euroOdd - 1) * 100)) : (Math.round(-100 / (euroOdd - 1 )))
}

const reducer = combineReducers({
	schedule,
	standings,
	teams,
	boxscores,
})

//const reducer = schedule
export default reducer
