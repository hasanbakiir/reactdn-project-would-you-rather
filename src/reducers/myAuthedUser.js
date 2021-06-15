import { SET_AUTHED_USER } from '../actions/myAuthedUser';

export default function myAuthedUser(state = null, action) {
    switch (action.type) {
        case SET_AUTHED_USER:
            return action.id

        default:
            return state
    }
}