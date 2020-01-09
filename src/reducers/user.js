import {SET_METHOD, SET_PROFILE, SET_USER} from "../actions/user";

const initialState = {
    user: null,
    profile: null,
    method: 'email'
};

export default (state=initialState, action) => {
    switch(action.type) {
        case SET_USER:
            if(action.payload) {
                return Object.assign({}, state, {
                    user: action.payload
                });
            } else {
                return Object.assign({}, state, {
                    user: action.payload
                });
            }

        case SET_PROFILE:
            return Object.assign({}, state, {
                profile: action.payload
            });

        case SET_METHOD:
            return Object.assign({}, state, {
                method: action.payload
            });

        default:
            return state;
    }
}