import {
    RECEIVE_myQuestions,
    ADD_ANSWER_TO_QUESTION,
    ADD_QUESTION
} from '../actions/myQuestions';

export default function myQuestions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_myQuestions:
            return {
                ...state,
                ...action.myQuestions
            }

        case ADD_ANSWER_TO_QUESTION:
            const { authUser, qid, answer } = action

            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat(authUser)
                    }
                }
            }

        case ADD_QUESTION:
            const { question } = action

            return {
                ...state,
                [question.id]: question
            }

        default:
            return state
    }
}