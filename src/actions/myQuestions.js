import { saveQuestion } from '../utils/api';
import { addQuestionToUser } from './users';

export const RECEIVE_myQuestions = 'RECEIVE_myQuestions'
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveMyQuestions(myQuestions) {
    return {
        type: RECEIVE_myQuestions,
        myQuestions
    }
}

export function addAnswerToQuestion(myAuthedUser, qid, answer) {
    return {
        type: ADD_ANSWER_TO_QUESTION,
        myAuthedUser,
        qid,
        answer
    }
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleSaveQuestion(optionOneText, optionTwoText, author) {
    return dispatch => {
        return saveQuestion({ optionOneText, optionTwoText, author }).then(
            question => {
                dispatch(addQuestion(question))
                dispatch(addQuestionToUser(question))
            }
        )
    }
}