import loggedReducer from './loggedReducer'
import profileReducer from './profileReducer'
import {topicsReducer} from './contentReducer'
import {combineReducers} from 'redux'

const allReducers=combineReducers({
  isLogged:loggedReducer,
  profile:profileReducer,
  topics:topicsReducer
})

export default allReducers
