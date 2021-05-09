import {call, put, takeLatest} from 'redux-saga/effects'

import {LOGIN_START, LOGOUT_START} from "../../action-types";
import {loginError, loginSuccess, logoutError, logoutSuccess} from "../../actions/user";
import {login, logout} from "../../../api/auth";
import {setStep} from "../../actions/ui";
import {Toast} from "../../../hooks/message.hook";
import {socket} from "../../../socket";

export default function* authWatcher() {
    yield takeLatest(LOGIN_START, loginSaga)
    yield takeLatest(LOGOUT_START, logoutSaga)
}

function* loginSaga({data}) {
    try {
        const response = yield call(login, {username: data.username, socketId: data.socketId})
        yield put(loginSuccess({
            username: response.data.username,
            userId: response.data.userId,
            socketId: response.data.socketId
        }))
        Toast(response.data.message)
        yield put(setStep(window.isMobileVersion ? "PICKUP" : "CHAT"))
    } catch (e) {
        yield put(loginError(e))
    }
}

function* logoutSaga(payload) {
    try {
        const response = yield call(logout, {userId: payload.userId})
        yield put(logoutSuccess())
        socket.emit('disconnect', payload.userId)
        Toast(response.data.message)
        yield put(setStep("LOGIN"))
    } catch (e) {
        yield put(logoutError(e))
    }
}
