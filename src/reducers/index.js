import { combineReducers } from 'redux';

import user from './user';
import status from './status';
import todo from './todo';

export default combineReducers({
    user,
    status,
    todo
});
