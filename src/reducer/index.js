import loggedReducer from './loggedReducer'
import profileReducer from './profileReducer'
import {combineReducers} from 'redux'

const allReducers=combineReducers({
  isLogged:loggedReducer,
  profile:profileReducer
})

export default allReducers
