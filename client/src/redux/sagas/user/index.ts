import {call, put, takeLatest} from 'redux-saga/effects'

import {CHAT, LOGIN, LOGIN_START, LOGOUT_START, PICKUP} from "../../action-types";
import {loginError, loginSuccess, logoutError, logoutSuccess} from "../../actions/user";
import {login, logout} from "../../../api/auth";
import {setStep} from "../../actions/ui";
import {Toast} from "../../../hooks/message.hook";
import {socket} from "../../../socket";
import {ILoginData, ILogoutData} from "../../../api/types";
import {ResponseGenerator} from "../types";

export default function* authWatcher() {
    yield takeLatest(LOGIN_START, loginSaga)
    yield takeLatest(LOGOUT_START, logoutSaga)
}

function* loginSaga({payload}: { payload: ILoginData, type: string }) {
    try {
        const {username, password, socketId} = payload
        const response: ResponseGenerator = yield call(login, {username, password, socketId})
        yield put(loginSuccess({
            username: response.data.username,
            userId: response.data.userId,
            socketId: response.data.socketId
        }))
        socket.connect()
        Toast(response.data.message)
        yield put(setStep(window.isMobileVersion ? PICKUP : CHAT))
    } catch (e) {
        Toast(e?.response?.data?.message)
        yield put(loginError())
    }
}

function* logoutSaga({userId}: { userId: string, type: string }) {
    try {
        const response: ResponseGenerator = yield call(logout, {userId})
        yield put(logoutSuccess())
        socket.disconnect()
        Toast(response.data.message)
        yield put(setStep(LOGIN))
    } catch (e) {
        Toast(e?.response?.data?.message)
        yield put(logoutError())
    }
}
