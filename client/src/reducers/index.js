import { combineReducers } from "redux";
import meals from './meals'
import alerts from './alerts'
import auths from './auths'
export default combineReducers({
    meals, alerts, auths
})