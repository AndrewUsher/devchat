import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {}
const middlewares = [thunk]

const store = createStore(() => [], initialState, applyMiddleware(...middlewares))

export default store
