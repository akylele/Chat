import { combineReducers } from 'redux'

import uiReducer from './ui/index';
import userReducer from './user/index';
import roomsReducer from './rooms/index';

export default combineReducers({
    ui: uiReducer,
    user: userReducer,
    rooms: roomsReducer
})