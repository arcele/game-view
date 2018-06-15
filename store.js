import { createStore, combineReducers, applyMiddleware } from 'redux'
import mainReducer from './reducers/main'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const reducer = combineReducers({
	mainReducer
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