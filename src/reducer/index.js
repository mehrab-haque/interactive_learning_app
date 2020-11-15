import loggedReducer from './loggedReducer'
import profileReducer from './profileReducer'
import {topicsReducer,seriesesReducer,problemReducer} from './contentReducer'
import {combineReducers} from 'redux'

const allReducers=combineReducers({
  isLogged:loggedReducer,
  profile:profileReducer,
  topics:topicsReducer,
  serieses:seriesesReducer,
  problem:problemReducer
})

export default allReducers
