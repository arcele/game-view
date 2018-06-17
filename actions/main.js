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

export const fetchGame = (id, stateGames) => {
	return dispatch => {
		// check if we have it on the state
		if(stateGames && stateGames.length) {
			stateGames.map((game) => {
				if(game.gameId == id) { // thing from match is a string so, no ===
					dispatch({type: SAVE_GAME, game })
				}
			})
		} else {
			// we gotta grab all the stuff for this game
			console.log('omg, A FULL FETCH CRAAAAAZY')
		}
	}
}