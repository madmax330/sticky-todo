
export const SET_LOADING = 'SET_LOADING';

export const SET_MESSAGE = 'SET_MESSAGE';

export const SET_FOCUS = 'SET_FOCUS';

export const setLoading = val => {
    return {
        type: SET_LOADING,
        payload: val
    }
};

export const setMessage = message => {
    return {
        type: SET_MESSAGE,
        payload: message
    }
};

export const setFocus = val => {
    return {
        type: SET_FOCUS,
        payload: val
    }
};