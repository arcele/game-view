import { SAVE_SCHEDULE } from '../types/main'
import { combineReducers } from 'redux'

const initState = {
	proGames: []
}

const schedule = (state = { proGames: [] }, action) => {
	switch (action.type) {
		case SAVE_SCHEDULE:
			// just nuke the whole schedule item and save what we have now, for now
			return action.proGames.progames
/*			return Object.assign(state, {}, {
				action.proGames
			})
*/
		default:
			return state
	}
}

const reducer = combineReducers({
	schedule,
})

export default reducer
