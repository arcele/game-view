import { FETCH_PLAYER, STORE_PLAYER } from '../types/main'

const initState = {

}

export default (state = initState, action) => {
	switch(action.type) {
		case STORE_PLAYER:
			return Object.assign(state, {}, {
				player: action.player
		})
		default:
			return state
	}
}