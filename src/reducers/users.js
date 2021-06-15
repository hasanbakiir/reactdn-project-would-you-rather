import {
    RECEIVE_USERS,
    ADD_ANSWER_TO_USER,
    ADD_QUESTION_TO_USER
} from '../actions/users'

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }

        case ADD_ANSWER_TO_USER:
            const { myAuthedUser, qid, answer } = action

            return {
                ...state,
                [myAuthedUser]: {
                    ...state[myAuthedUser],
                    answers: {
                        ...state[myAuthedUser].answers,
                        [qid]: answer
                    }
                }
            }
        case ADD_QUESTION_TO_USER:
            const { id, author } = action

            return {
                ...state,
                [author]: {
                    ...state[author],
                    myQuestions: state[author].myQuestions.concat(id)
                }
            }

        default:
            return state
    }
}