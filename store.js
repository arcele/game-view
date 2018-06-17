import { createStore, combineReducers, applyMiddleware } from 'redux'
import gameView from './reducers/main'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const reducer = combineReducers({
	gameView
})

const middleware = [
	thunk,
	logger,
]

const store = createStore(
	reducer,
	applyMiddleware(...middleware)
)

export default store;