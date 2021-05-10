import {call, put, select, takeLatest} from 'redux-saga/effects'

import {
    CREATE_ROOM_START,
    CREATE_ROOM_SUCCESS, DELETE_ROOM_START,
    LOAD_ROOM_BY_ID_START, LOAD_ROOMS_START,
    LOGIN_SUCCESS
} from "../../action-types";
import {
    createRoomError,
    createRoomSuccess, deleteRoomError, deleteRoomSuccess, loadRoomByIdError, loadRoomByIdSuccess,
    loadRoomsError, loadRoomsStart,
    loadRoomsSuccess, setActiveRoom
} from "../../actions/rooms";
import {createRoom, getAllRooms, getRoomById, removeRoomById} from "../../../api/rooms";
import {Toast} from "../../../hooks/message.hook";
import {socket} from "../../../socket";

export default function* authWatcher() {
    yield takeLatest([LOGIN_SUCCESS, CREATE_ROOM_SUCCESS,LOAD_ROOMS_START], loadRoomsSaga)
    yield takeLatest(CREATE_ROOM_START, createRoomSaga)
    yield takeLatest(LOAD_ROOM_BY_ID_START, loadRoomByIdSaga)
    yield takeLatest(DELETE_ROOM_START, deleteRoomSaga)
}

function* loadRoomsSaga() {
    try {
        const responseRooms = yield call(getAllRooms)
        yield put(loadRoomsSuccess(responseRooms.data))
    } catch (e) {
        Toast(e?.response?.data?.message)
        yield put(loadRoomsError())
    }
}

function* createRoomSaga({payload}) {
    try {
        const response = yield call(createRoom, {title: payload.title, userId: payload.userId})
        yield put(createRoomSuccess())
        Toast(response.data.message)
    } catch (e) {
        Toast(e?.response?.data?.message)
        yield put(createRoomError())
    }
}

function* loadRoomByIdSaga(payload) {
    try {
        const response = yield call(getRoomById, payload.id)
        yield put(loadRoomByIdSuccess(response.data.pop()))
        Toast(response.data.message)
    } catch (e) {
        Toast(e?.response?.data?.message)
        yield put(loadRoomByIdError())
    }
}

function* deleteRoomSaga(payload) {
    const activeRoomId = yield select(store => store.rooms.activeRoom)
    try {
        const response = yield call(removeRoomById, payload.id)
        yield put(deleteRoomSuccess())
        Toast(response.data.message)
        socket.emit('ROOM:DELETE', {roomId: payload.id})

        if(activeRoomId === payload.id){
            yield put(setActiveRoom(null))
        }
        yield put(loadRoomsStart())
    } catch (e) {
        Toast(e?.response?.data?.message)
        yield put(deleteRoomError())
    }
}
