import {call, put, takeLatest} from 'redux-saga/effects'

import {CREATE_ROOM_START, CREATE_ROOM_SUCCESS, LOGIN_SUCCESS} from "../../action-types";
import {
    createRoomError,
    createRoomSuccess,
    loadRoomsError,
    loadRoomsStart,
    loadRoomsSuccess
} from "../../actions/rooms";
import {createRoom, getAllRooms} from "../../../api/rooms";

export default function* authWatcher() {
    yield takeLatest([LOGIN_SUCCESS, CREATE_ROOM_SUCCESS], loadRoomsSaga)
    yield takeLatest(CREATE_ROOM_START, createRoomSaga)
}

function* loadRoomsSaga() {
    yield put(loadRoomsStart())
    try {
        const responseRooms = yield call(getAllRooms)
        yield put(loadRoomsSuccess(responseRooms.data))
    } catch (e) {
        yield put(loadRoomsError(e))
    }
}

function* createRoomSaga(payload) {
    try {
        yield call(createRoom, {title: payload.title})
        yield put(createRoomSuccess())
    } catch (e) {
        yield put(createRoomError(e))
    }
}
