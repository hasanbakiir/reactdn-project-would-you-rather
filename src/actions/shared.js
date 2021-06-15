import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveMyQuestions } from '../actions/myQuestions'

export function handleInitialData() {
    return (dispatch) => {
        return getInitialData()
            .then(({ users, myQuestions }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveMyQuestions(myQuestions))
            })
    }
}