import { combineReducers } from 'redux'

import uiReducer from './ui/index';
import userReducer from './user/index';
import chatsReducer from './chats/index';

export default combineReducers({
    ui: uiReducer,
    user: userReducer,
    chats: chatsReducer
})