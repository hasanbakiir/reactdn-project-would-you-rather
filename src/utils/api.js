import {
    _getUsers,
    _getmyQuestions,
    _saveQuestion,
    _saveQuestionAnswer
} from './_DATA'

export function getInitialData() {
    return Promise.all([_getUsers(), _getmyQuestions()]).then(
        ([users, myQuestions]) => ({
            users,
            myQuestions
        })
    );
}

export function saveQuestion(question) {
    return _saveQuestion(question);
}

export function saveQuestionAnswer(myAuthedUser, qid, answer) {
    return _saveQuestionAnswer({ myAuthedUser, qid, answer });
}