import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        // if user is logged in, return user model
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}