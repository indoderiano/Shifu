import AuthReducers from './AuthReducers'
import SchedulesReducers from './SchedulesReducers'
import {combineReducers} from 'redux'



export default combineReducers({
    Auth: AuthReducers,
    Schedules: SchedulesReducers // array of objects
})