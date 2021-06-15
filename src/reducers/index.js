import { combineReducers } from 'redux'
import myAuthedUser from './myAuthedUser'
import myQuestions from './myQuestions'
import users from './users'

export default combineReducers({
    myAuthedUser,
    myQuestions,
    users
})