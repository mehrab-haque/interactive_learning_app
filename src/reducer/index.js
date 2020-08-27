import loggedReducer from './loggedReducer'
import profileReducer from './profileReducer'
import {topicsReducer,seriesesReducer} from './contentReducer'
import {combineReducers} from 'redux'

const allReducers=combineReducers({
  isLogged:loggedReducer,
  profile:profileReducer,
  topics:topicsReducer,
  serieses:seriesesReducer
})

export default allReducers
