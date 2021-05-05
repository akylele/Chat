import {call, put, takeLatest} from 'redux-saga/effects'

import {CREATE_CHAT_START, CREATE_CHAT_SUCCESS, LOGIN_SUCCESS} from "../../action-types";
import {
    createChatError,
    createChatSuccess,
    loadChatsError,
    loadChatsStart,
    loadChatsSuccess
} from "../../actions/rooms";
import {createChat, getAllChats} from "../../../api/chats";

export default function* authWatcher() {
    yield takeLatest([LOGIN_SUCCESS, CREATE_CHAT_SUCCESS], loadChatsSaga)
    yield takeLatest(CREATE_CHAT_START, createChatSaga)
}

function* loadChatsSaga() {
    yield put(loadChatsStart())
    try {
        const responseChats = yield call(getAllChats)
        yield put(loadChatsSuccess(responseChats.data))
    } catch (e) {
        yield put(loadChatsError(e))
    }
}

function* createChatSaga(payload) {
    try {
        yield call(createChat, {title: payload.title})
        yield put(createChatSuccess())
    } catch (e) {
        yield put(createChatError(e))
    }
}
