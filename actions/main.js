import { SAVE_SCHEDULE, SAVE_GAME, SAVE_PROBABLE_STARTERS, REQUEST_SCHEDULE, SAVE_BVP_DATA, SAVE_PITCHER_DETAILS } from '../types/main'
import fetch from 'isomorphic-fetch'


export const savePlayer = (player) => {
  return dispatch => {
    dispatch({
       type: 'STORE_PLAYER',
       data: {
        player
       }
    })
  }
}

export const makeScheduleCall = (gameDate, season, dispatch) => {
	// make schedule call, return a promise that resolves with the contents of the schedule
	const scheduleApi = `http://lookup-service-prod.mlb.com/json/named.mlb_broadcast_info.bam?src_type='TV'&tcid=mm_mlb_schedule&sort_by='game_time_et_asc'&home_away='H'&start_date='${gameDate}'&end_date='${gameDate}'&season='${season}'`
	return new Promise((resolve) => {
		fetch(scheduleApi).then((response) => {
			return response.json()
		}).then((resJson) => {
			if(dispatch) {
				dispatch({type: SAVE_SCHEDULE, games: resJson['mlb_broadcast_info']['queryResults']['row'] })
			}
			resolve(resJson)
		})
	})
}

export const fetchSchedule = () => {
	const gameDate = new Date().toISOString().split('T')[0].replace(/-/g,'')
	const gameYear = new Date().getFullYear()
	return dispatch => {
		dispatch({type: REQUEST_SCHEDULE})
		makeScheduleCall(gameDate, gameYear, dispatch)
	}
}

export const fetchStarterDetails = (starter, dispatch) => {
	return new Promise((resolve) => {
		const name = starter.fullName
		const lastName = name.split(',')[0]
		const firstName = name.split(' ')[name.split(' ').length-1]
		const playerSearchApi = `http://games.espn.com/flb/api/v2/playerInfo?availabilityFilter=all&lastNameFilter=${lastName}&useCurrentSeasonRealStats=true&useCurrentSeasonProjectedStats=false&usePreviousSeasonRealStats=false&useCurrentPeriodRealStats=true&useCurrentPeriodProjectedStats=true&usePreviousPeriodRealStats=false&includeTopStatCategories=false&includeLatestNews=true&offset=0&limit=100&top3=false&useTxScoringPeriod=true&processAverages=false&rand=${Math.round(Math.random() * 100000)}`
		fetch(playerSearchApi).then((res) => {
			return res.json()
		}).then((playerSearchData) => {
			return new Promise((searchResolve) => {
				playerSearchData.playerInfo.players.map((player) => {
					// this will break if there's two guys with the same name ¯\_(ツ)_/¯
					if(player.player.firstName === lastName) {
						searchResolve(player)
					}
				})
				// we couldn't match a player, I guess it's the first guy?
				searchResolve(playerSearchData.playerInfo.players[0])
			}).then((homeStarter) => {
				// we should still get the gameLog, but, this is a nice start
				dispatch( {type: SAVE_PITCHER_DETAILS, pitcher: starter.id, data: homeStarter })
				resolve(homeStarter)
			})		
		})
	})
}

export const fetchGame = (game) => {
	return dispatch => {
		const id = game['game_pk']
		const probableApi = `https://statsapi.mlb.com/api/v1.1/game/${id}/feed/live?language=en&timecode=`
		fetch(probableApi).then((res) => {
			return res.json()
		}).then((probableData) => {
			const starters = probableData.gameData.probablePitchers
			dispatch({ type: SAVE_PROBABLE_STARTERS, gameId: id, starters })
			const homePitcherApi = `https://lookup-service-prod.mlb.com/json/named.team_bvp_5y.bam?vs_pitcher_id=${starters.home.id}&game_type=%27R%27&team_id=${game['away_team_id']}&year=2018`
			const awayPitcherApi = `https://lookup-service-prod.mlb.com/json/named.team_bvp_5y.bam?vs_pitcher_id=${starters.away.id}&game_type=%27R%27&team_id=${game['home_team_id']}&year=2018`
			fetch(homePitcherApi).then((res) => {
				return res.json()
			}).then((homeData) => {
				dispatch({type: SAVE_BVP_DATA, pitcher: starters.home.id, data: homeData})
				fetch(awayPitcherApi).then((awayRes) => {
					return awayRes.json()
				}).then((awayData) => {
					dispatch({type: SAVE_BVP_DATA, pitcher: starters.away.id, data: awayData})
					// now we've got the bvp data, and teh probables, we can fetch the pitcher data, first we need to get the espn playerIds, because we want espn stuff for this like game log
					fetchStarterDetails(starters.home, dispatch).then( (homeStarter) => {
						fetchStarterDetails(starters.away, dispatch).then( (awayStarter) => {
							// What else?!
							console.log(`we've got all the game data we want for now`)
						})
					})
				})
			})
		})

		const gameApi = `https://statsapi.mlb.com/api/v1.1/game/${id}/feed/live?language=en`
		// get all of our other neat game data here.
	}
}
