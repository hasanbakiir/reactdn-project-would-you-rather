import { saveQuestionAnswer } from '../utils/api'
import { addAnswerToQuestion } from '../actions/myQuestions'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER'
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}


function addAnswerToUser(myAuthedUser, qid, answer) {
    return {
        type: ADD_ANSWER_TO_USER,
        myAuthedUser,
        qid,
        answer
    }
}

export function handleSaveQuestionAnswer(myAuthedUser, qid, answer) {
    return dispatch => {
        dispatch(addAnswerToUser(myAuthedUser, qid, answer))
        dispatch(addAnswerToQuestion(myAuthedUser, qid, answer))

        return saveQuestionAnswer(myAuthedUser, qid, answer).catch(e => {
            console.warn('Error in handleSaveQuestionAnswer:', e)
        })
    }
}

export function addQuestionToUser({ id, author }) {
    return {
        type: ADD_QUESTION_TO_USER,
        id,
        author
    }
}