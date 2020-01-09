import {SET_FOCUS, SET_LOADING, SET_MESSAGE} from "../actions/status";


const initialState = {
    loading: false,
    message: null,
    focus: null
};

export default (state=initialState, action) => {
    switch(action.type) {
        case SET_LOADING:
            return Object.assign({}, state, {
                loading: action.payload
            });

        case SET_MESSAGE:
            return Object.assign({}, state, {
                message: action.payload
            });

        case SET_FOCUS:
            return Object.assign({}, state, {
                focus: action.payload
            });

        default:
            return state;
    }
}