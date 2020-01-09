import {auth, provider, profilesCollection} from "../config/firebase";
import {setLoading, setMessage} from "./status";

export const SET_USER = 'SET_USER';

export const SET_PROFILE = 'SET_PROFILE';

export const SET_METHOD = 'SET_METHOD';

export const fetchUser = () => dispatch => {
    auth.onAuthStateChanged(user => {
        if (user) {
            dispatch({
                type: SET_USER,
                payload: {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email
                }
            });
            dispatch(fetchProfile(user.uid));
        } else {
            dispatch({
                type: SET_USER,
                payload: null
            });
        }
    })
};

export const signIn = (email, password) => dispatch => {
    dispatch(setLoading(true));
    if (email && password) {
        auth.signInWithEmailAndPassword(email, password)
            .then(firebaseUser => {
                dispatch(fetchProfile(firebaseUser.user.uid));
            })
            .catch(error => {
                dispatch(setMessage({message: `Error signing in: ${error.message}`, status: 'danger'}));
                dispatch(setLoading(false));
            });
    } else {
        dispatch(setMessage({message: `Email and password are required`, status: 'warning'}));
        dispatch(setLoading(false));
    }
};

export const googleSignIn = (fetch=true) => dispatch => {
    dispatch(setLoading(true));
    auth.signInWithPopup(provider)
        .then(result => {
            if(fetch) {
                dispatch(fetchProfile(result.user.uid));
            }
        }).catch(error => {
        dispatch.setMessage({message: `Error signing in: ${error.message}`, status: 'danger'});
        dispatch(setLoading(false));
    });
};

export const signOut = () => dispatch => {
    auth.signOut().then(() => {
        // sign out successful
        dispatch({
            type: SET_PROFILE,
            payload: null
        })
    }).catch(error => {
        dispatch(setMessage({message: `Error signing out, try again: ${error.message}`, status: 'danger'}));
    })
};

export const fetchProfile = (id) => dispatch => {
    profilesCollection.doc(id).get().then(doc => {
        if (doc.exists) {
            dispatch({
                type: SET_PROFILE,
                payload: doc.data()
            });
        } else {
            dispatch(setMessage({message: `Profile not found, unable to log you in`, status: 'danger'}));
        }
        dispatch(setLoading(false));
    }).catch(error => {
        dispatch(setMessage({message: `Error fetching profile: ${error.message}`, status: 'danger'}));
        dispatch(setLoading(false));
    });
};

export const registerUser = (name, email, password) => dispatch => {
    dispatch(setLoading(true));
    auth.createUserWithEmailAndPassword(email, password)
        .then(firebaseUser => {
            const uid = firebaseUser.user.uid;
            profilesCollection.doc(uid).set({
                id: uid,
                dateJoined: new Date().getTime(),
                name: name,
                email: email,
                new: true,
                registration: 'email'
            }).then(() => {
                dispatch(fetchProfile(uid));
            }).catch(error => {
                dispatch(setMessage({message: `Error creating profile: ${error.message}`, status: 'danger'}));
                dispatch(setLoading(false));
            });
        }).catch(error => {
        dispatch(setMessage({message: `Error creating account: ${error.message}`, status: 'danger'}));
        dispatch(setLoading(false));
    });
};

export const googleRegister = () => dispatch => {
    const user = auth.currentUser;
    profilesCollection.doc(user.uid).set({
        id: user.uid,
        dateJoined: new Date().getTime(),
        name: user.displayName,
        email: user.email,
        new: true,
        registration: 'google'
    }).then(() => {
        dispatch(fetchProfile(user.uid));
    }).catch(error => {
        dispatch(setMessage({message: `Error creating profile: ${error.message}`, status: 'danger'}));
        dispatch(setLoading(false));
    });
};

export const setMethod = val => {
    return {
        type: SET_METHOD,
        payload: val
    }
};

export const removeNew = () => dispatch => {
    profilesCollection.doc(auth.currentUser.uid).update('new', false)
        .then(() => {

        });
};

export const editProfile = name => dispatch => {
    dispatch(setLoading(true));
    profilesCollection.doc(auth.currentUser.uid).update('name', name)
        .then(() => {
            dispatch(setMessage({message: 'Profile updated successfully', status: 'success'}));
            dispatch(fetchProfile(auth.currentUser.uid));
            dispatch(setLoading(false));
        }).catch(error => {
            dispatch(setMessage({message: `Error updating profile: ${error.message}`, status: 'danger'}));
            dispatch(setLoading(false));
        });
};

export const changePassword = () => dispatch => {
    dispatch(setLoading(true));
    auth.sendPasswordResetEmail(auth.currentUser.email)
        .then(() => {
            dispatch(setMessage({message: `Password reset email was sent to ${auth.currentUser.email}`, status: "success"}));
            dispatch(setLoading(false));
        })
        .catch(error => {
            dispatch(setMessage({message: `Error reseting password: ${error.message}`, status: "danger"}));
            dispatch(setLoading(false));
        });
};

