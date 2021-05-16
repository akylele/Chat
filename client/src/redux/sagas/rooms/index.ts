import {call, put, select, takeLatest} from 'redux-saga/effects'

import {
    CREATE_ROOM_START,
    CREATE_ROOM_SUCCESS,
    DELETE_ROOM_START,
    LOAD_ROOMS_START,
    LOGIN_SUCCESS
} from "../../action-types";
import {
    createRoomError,
    createRoomSuccess,
    deleteRoomError,
    deleteRoomSuccess,
    loadRoomsError,
    loadRoomsStart,
    loadRoomsSuccess,
    setActiveRoom
} from "../../actions/rooms";
import {createRoom, getAllRooms, removeRoomById} from "../../../api/rooms";
import {Toast} from "../../../hooks/message.hook";
import {socket} from "../../../socket";
import {ResponseGenerator} from "../types";

export default function* authWatcher() {
    yield takeLatest([LOGIN_SUCCESS, CREATE_ROOM_SUCCESS, LOAD_ROOMS_START], loadRoomsSaga)
    yield takeLatest(CREATE_ROOM_START, createRoomSaga)
    yield takeLatest(DELETE_ROOM_START, deleteRoomSaga)
}

function* loadRoomsSaga() {
    try {
        const responseRooms: ResponseGenerator = yield call(getAllRooms)
        yield put(loadRoomsSuccess(responseRooms.data))
    } catch (e) {
        Toast(e?.response?.data?.message)
        yield put(loadRoomsError())
    }
}

function* createRoomSaga({data: {title, userId}}:{data: {title: string, userId: string}, type: string}) {
    try {
        const response: ResponseGenerator = yield call(createRoom, {title, userId})
        yield put(createRoomSuccess())
        Toast(response.data.message)
    } catch (e) {
        Toast(e?.response?.data?.message)
        yield put(createRoomError())
    }
}

function* deleteRoomSaga({id}:{id: string, type: string}) {
    const activeRoomId: string = yield select(store => store.rooms.activeRoom)
    try {
        const response: ResponseGenerator = yield call(removeRoomById, id)
        yield put(deleteRoomSuccess())
        Toast(response.data.message)
        socket.emit('ROOM:DELETE', {roomId: id})

        if(activeRoomId === id){
            yield put(setActiveRoom(null))
        }
        yield put(loadRoomsStart())
    } catch (e) {
        Toast(e?.response?.data?.message)
        yield put(deleteRoomError())
    }
}
