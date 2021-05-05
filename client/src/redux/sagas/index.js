import { all } from 'redux-saga/effects'
import authWatcher from './user'
import chatsWatcher from './chats'

export default function* rootSaga() {
    yield all([
        authWatcher(),
        chatsWatcher()
    ])
}