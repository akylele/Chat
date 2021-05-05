import { all } from 'redux-saga/effects'
import authWatcher from './user'
import roomsWatcher from './rooms'

export default function* rootSaga() {
    yield all([
        authWatcher(),
        roomsWatcher()
    ])
}