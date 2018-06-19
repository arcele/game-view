import { SAVE_SCHEDULE, SAVE_GAME } from '../types/main'
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

export const fetchSchedule = () => {
	// check if we have proGames before we do this tho.

	// mlb schedule: http://lookup-service-prod.mlb.com/json/named.mlb_broadcast_info.bam?src_type='TV'&tcid=mm_mlb_schedule&sort_by='game_time_et_asc'&home_away='H'&start_date='20180619'&end_date='20180619'&season='2018'

	const gameDate = new Date().toISOString().split('T')[0].replace(/-/g,'')
	const gameYear = new Date().getFullYear()
	const scheduleApi = `http://lookup-service-prod.mlb.com/json/named.mlb_broadcast_info.bam?src_type='TV'&tcid=mm_mlb_schedule&sort_by='game_time_et_asc'&home_away='H'&start_date='${gameDate}'&end_date='${gameDate}'&season='${gameYear}'`
	console.log('lets grab:', scheduleApi)
	return dispatch => {
		//fetch('http://games.espn.com/flb/api/v2/proGames?scoringPeriodId=83').then((response) => {
		fetch(scheduleApi).then((response) => {
			return response.json()
		}).then((resJson) => {
			dispatch({type: SAVE_SCHEDULE, games: resJson['mlb_broadcast_info']['queryResults']['row'] })
		})
	}
}

export const fetchGame = (id) => {
	// potential game feeds:
	// http://www.espn.com/mlb/game?gameId=380619122&xhr=1

	return dispatch => {
		fetch(`http://site.api.espn.com/apis/site/v2/sports/baseball/leagues/mlb/gameheader?event=${id}&lang=en&contentOrigin=espn`).then((res) => {
			return res.json()
		}).then((resJson) => {
			dispatch({type: SAVE_GAME, game: resJson})
			// we need to use mlb feeds instead of these espn ones.
			// now get bvp data from here? http://lookup-service-prod.mlb.com/json/named.stats_batter_vs_pitcher_composed.bam?sport_code=%27mlb%27&game_type=%27R%27&pitcher_id=592826&team_id=138&season=2018
			console.log('can i get a playerId and a team id...138? wtf', resJson)
		})
	}
}

