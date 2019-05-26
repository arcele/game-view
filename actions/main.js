import { SAVE_SCHEDULE, SAVE_GAME, SAVE_PROBABLE_STARTERS, REQUEST_SCHEDULE, SAVE_BVP_DATA, SAVE_PITCHER_DETAILS } from '../types/main'
import fetch from 'isomorphic-fetch'
//apiKey is not in the project and must be created locally -- for a free key visit https://the-odds-api.com/
import apiKey from '../config/apiKey'

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
				dispatch({type: SAVE_SCHEDULE, games: resJson['mlb_broadcast_info']['queryResults']['row'], date: gameDate })
			}
			resolve(resJson)
		})
	})
}
export const fetchSchedule = (gameDate) => {
	if(!gameDate) gameDate = new Date().toISOString().split('T')[0].replace(/-/g,'')
	const gameYear = new Date().getFullYear()
	return dispatch => {
		makeScheduleCall(gameDate, gameYear, dispatch).then(() => {
      makeBettingOddsCall(dispatch)
    })
	}
}

export const fetchStarterDetails = (starter, dispatch) => {
	return new Promise((resolve) => {
    const playerStatsApi = `http://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id=%27mlb%27&game_type=%27R%27&season=%272019%27&player_id=%27${starter.id}%27`

		fetch(playerStatsApi).then((res) => {
			return res.json()
		}).then((playerStatsData) => {
			return new Promise((statsResolve) => {
        statsResolve(playerStatsData)
			}).then((starterData) => {
				// we should still get the gameLog, but, this is a nice start
        let data = starterData && starterData.sport_pitching_tm && starterData.sport_pitching_tm.queryResults
				dispatch( {type: SAVE_PITCHER_DETAILS, pitcher: starter.id, data })
				resolve(data)
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
			const homePitcherApi = `https://lookup-service-prod.mlb.com/json/named.team_bvp_5y.bam?vs_pitcher_id=${starters.home.id}&game_type=%27R%27&team_id=${game.awayTeam.id}&year=2018`
			const awayPitcherApi = `https://lookup-service-prod.mlb.com/json/named.team_bvp_5y.bam?vs_pitcher_id=${starters.away.id}&game_type=%27R%27&team_id=${game.homeTeam.id}&year=2018`
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

export const makeBettingOddsCall = (dispatch) => {
  // Returns a promise that resolves with the most recent upcoming MLB betting odds

  // uncomment next line to skip the betting odds call which is throttled to 500 req/mo
//  return new Promise((r) => ( r() ))

  return new Promise((resolve) => {
    let oddsApi = `https://api.the-odds-api.com/v3/odds?sport=baseball_mlb&region=us&mkt=h2h&apiKey=${apiKey}`
    fetch(oddsApi).then((res) => {
      return res.json()
    }).then((odds) => {
      console.log('weve got the odds, put em in the state, dog', odds)
      dispatch({type: 'SAVE_BETTING_ODDS', odds})
      resolve(odds)
    })
  })

  }
