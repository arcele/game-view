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
	return dispatch => {
		fetch('http://games.espn.com/flb/api/v2/proGames?scoringPeriodId=81').then((response) => {
			return response.json()
		}).then((resJson) => {
			dispatch({type: SAVE_SCHEDULE, games: resJson.progames.games })
		})
	}
}

export const fetchGame = (id) => {
	return dispatch => {
		fetch('http://site.api.espn.com/apis/site/v2/sports/baseball/leagues/mlb/gameheader?event=380617101&lang=en&contentOrigin=espn').then((res) => {
			return res.json()
		}).then((resJson) => {
			dispatch({type: SAVE_GAME, game: resJson})
		})
	}
}