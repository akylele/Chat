import {call, put, takeLatest} from 'redux-saga/effects'

import {LOGIN_START, LOGOUT_START} from "../../action-types";
import {loginError, loginSuccess, logoutError, logoutSuccess} from "../../actions/user";
import {login, logout} from "../../../api/auth";
import {setStep} from "../../actions/ui";

export default function* authWatcher() {
    yield takeLatest(LOGIN_START, loginSaga)
    yield takeLatest(LOGOUT_START, logoutSaga)
}

function* loginSaga(payload) {
    try {
        const responseUser = yield call(login, {username: payload.username})
        yield put(loginSuccess({
            username: responseUser.data.username,
            userId: responseUser.data.userId
        }))
        yield put(setStep("CHAT"))
    } catch (e) {
        yield put(loginError(e))
    }
}

function* logoutSaga(payload) {
    try {
        yield call(logout, {userId: payload.userId})
        yield put(logoutSuccess())
        yield put(setStep("LOGIN"))
    } catch (e) {
        yield put(logoutError(e))
    }
}
