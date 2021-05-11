import { combineReducers } from 'redux'

import uiReducer from './ui';
import userReducer from './user';
import roomsReducer from './rooms';

export default combineReducers({
    ui: uiReducer,
    user: userReducer,
    rooms: roomsReducer
})