import { FETCH_PLAYER, STORE_PLAYER } from '../types/main'

export const savePlayer = (player) => {
  return dispatch => {
    dispatch({
       type: STORE_PLAYER,
       data: {
        player
       }
    })
  }
}