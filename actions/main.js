import { SAVE_SCHEDULE } from '../types/main'
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
		}).then((proGames) => {
			dispatch({type: SAVE_SCHEDULE, proGames})
		})
	}
}