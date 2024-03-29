import { SAVE_SCHEDULE, SAVE_GAME, SAVE_GAME_DATA, REQUEST_SCHEDULE, SAVE_BVP_DATA, SAVE_PITCHER_DETAILS, LOAD_ODDS_FROM_STATE, LOAD_ODDS_FROM_LOCAL_STORAGE, SAVE_BETTING_ODDS, SAVE_STANDINGS } from '../types/main'
import CONSTANT_TEAMS from '../constants/teams'
import moment from 'moment'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'
//apiKey is not in the project and must be created locally -- for a free key visit https://the-odds-api.com/
import apiKey from '../config/apiKey'

const SEASON = '2023'
const API_HOST = 'https://statsapi.mlb.com/'

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
  let scheduleApi = `http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&date=${gameDate}`
  return new Promise((resolve) => {
    fetch(scheduleApi).then((resp) => {
      return resp.json()
    }).then((resJson) => {
      if(dispatch) {
        let games = resJson.dates[0] && resJson.dates[0].games || []
        dispatch({type: SAVE_SCHEDULE, games, date: gameDate})
      }
      resolve(resJson)
    })
  })
}

export const makeStandingsCalls = (dispatch) => {
  let leagues = [ // leagues we care about from http://statsapi.mlb.com/api/v1/league/?seasonId=2018
      103, // American
      104, // National
  ],

    divisionApi = 'http://statsapi.mlb.com/api/v1/divisions/?seasonId=2022&leagueId={leagueId}',
    leagueApi = 'http://statsapi.mlb.com/api/v1/standings/?leagueId={leagueId}'
    console.log('doin stuff')
    return Promise.all(
      leagues.map((league) => {
          return new Promise((res) => {
            fetch(leagueApi.replace('{leagueId}', league)).then((resp) => {
              return resp.json()
            }).then((standings) => {
              dispatch({type: SAVE_STANDINGS, standings, league })
              res(standings)
            })
          })
      })
    )
}

export const makeTeamScheduleCall = (dispatch, teamId) => {
  let endDate = moment().add(-1, 'd').format('YYYY-MM-DD'),
      startDate = moment().add(-10, 'd').format('YYYY-MM-DD'),
      teamScheduleApi = 'http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&teamId={teamId}&season=2022&startDate=' + startDate + '&endDate=' + endDate,
      boxScoreApi = 'http://statsapi.mlb.com/api/v1/game/{gameId}/boxscore';
  return new Promise((res) => {
    fetch(teamScheduleApi.replace('{teamId}', teamId)).then((resp) => {
      return resp.json()
    }).then((schedule) => {
      dispatch({type: 'SAVE_TEAM_SCHEDULE', teamId, schedule})
      schedule.dates.map((day) => {
        day.games.map((game) => {
          // just doing these all asyc because we're not waiting on anything
          // need to find a way to check the existing state for boxscores so that we're not requesting them again
          // if we've fetched them for another team
          fetch(boxScoreApi.replace('{gameId}', game.gamePk)).then((resp) => {
            return resp.json()
          }).then((boxScore) => {
            dispatch({type: 'SAVE_BOX_SCORE', gameId: game.gamePk, boxScore})
          })
        })
      })
      res(schedule); // this will resolve before the box scores are downloaded
    })
  })
}

export const fetchSchedule = (gameDate, oddsResult) => {
  if(!gameDate) gameDate = moment().format('YYYY-MM-DD')
	const gameYear = moment(gameDate).format('YYYY')
	return dispatch => {
    makeScheduleCall(gameDate, gameYear, dispatch).then(() => {
      makeStandingsCalls(dispatch).then(() => {
        let localStorageOdds = localStorage.getItem('oddsData-' + moment().format("YYYYMMDD"))
        if(oddsResult) { // run the saved odds through our schedule again
          dispatch({type: LOAD_ODDS_FROM_STATE, odds: oddsResult})
        } else if(localStorageOdds != null) { // load the adds we pulled up from local storage
          dispatch({type: LOAD_ODDS_FROM_LOCAL_STORAGE, odds: JSON.parse(localStorageOdds)})
        } else { // no odds fetched yet, need to grab them
          makeBettingOddsCall(dispatch)
        }
      })
    })
	}
}

export const fetchStarterDetails = (starter, dispatch) => {
	return new Promise((resolve) => {
    const playerStatsApi = `http://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id=%27mlb%27&game_type=%27R%27&season=%272022%27&player_id=%27${starter.id}%27`

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

export const fetchGame = (id) => {
  return dispatch => {
		const probableApi = `https://statsapi.mlb.com/api/v1.1/game/${id}/feed/live?language=en&timecode=`
		fetch(probableApi).then((res) => {
			return res.json()
		}).then((probableData) => {
      const gameData = probableData && probableData.gameData,
        starters = gameData && gameData.probablePitchers,
        homeTeamId = gameData && gameData.teams.home.id,
        awayTeamId = gameData && gameData.teams.away.id;
  			dispatch({ type: SAVE_GAME_DATA, gameId: id, game: probableData })

      /*
      No BVP API data available.  Commenting out until we can get it.

			const homePitcherApi = `https://lookup-service-prod.mlb.com/json/named.team_bvp_5y.bam?vs_pitcher_id=${starters.home.id}&game_type=%27R%27&team_id=${awayTeamId}&year=2022`
			const awayPitcherApi = `https://lookup-service-prod.mlb.com/json/named.team_bvp_5y.bam?vs_pitcher_id=${starters.away.id}&game_type=%27R%27&team_id=${homeTeamId}&year=2022`
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
							// What else
						})
					})
				})
			})
      */
		})

		const gameApi = `https://statsapi.mlb.com/api/v1.1/game/${id}/feed/live?language=en`
		// get all of our other neat game data here.
	}
}

export const makeBettingOddsCall = (dispatch) => {
  // Returns a promise that resolves with the most recent upcoming MLB betting odds

  // uncomment next line to skip the betting odds call which is throttled to 500 req/mo
  //return new Promise((r) => ( r() ))

  return new Promise((resolve) => {
    let oddsApi = `https://api.the-odds-api.com/v3/odds?sport=baseball_mlb&region=us&mkt=h2h&apiKey=${apiKey}`
    fetch(oddsApi).then((res) => {
      return res.json()
    }).then((odds) => {
      console.log('weve got the odds, put em in the state, dog', odds)
      dispatch({type: SAVE_BETTING_ODDS, odds})
      resolve(odds)
    })
  })

  }

export const getScheduleDate = (props) => {
  return props && props.match && props.match.params && props.match.params.date || moment().format('YYYY-MM-DD')
}

export const getTeam = (teamId) => {
  // gets a team's constant data
  return _.find(CONSTANT_TEAMS.teams, {id: teamId})
}
