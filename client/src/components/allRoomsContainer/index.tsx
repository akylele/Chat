import React, {ChangeEvent} from 'react'
import styled from 'styled-components';
import {connect} from "react-redux";

import {socket} from '../../socket';
import {
    createRoomStart,
    deleteRoomStart,
    loadRoomsStart,
    setActiveRoom,
    setFilteredRooms
} from "../../redux/actions/rooms";

import List from "./List";
import Header from "./Header";
import Input from "../Basic/Input";
import Row from "../Basic/Row";
import {AllRoomsContainerComponent, AllRoomsContainerComponentDispatch, AllRoomsContainerComponentStore} from "./types";
import {IRoom} from '../../redux/actions/types';

const Container = styled.div`
  min-width: 300px;
  max-width: 300px;
  padding: 10px 20px;
  background-color: rgb(245, 245, 245);
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;

  @media (max-width: 500px) {
    max-width: 100%;
    min-width: 100%;
  }
`;


const AllRoomsContainer = ({
                               createRoom,
                               user,
                               setFilteredRooms,
                               rooms,
                               activeRoom,
                               deleteRoom,
                               setActiveRoom,
                               history,
                               loadRooms,
                               filteredRooms
                           }: AllRoomsContainerComponent) => {

    const handleNewRoom = (title: string) => {
        createRoom({userId: user.userId, title})
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            return setFilteredRooms(rooms.filter((room: IRoom) => room.title.includes(e.target.value)))
        }

        return setFilteredRooms(null)
    }

    const handleChangeActive = async (id: string) => {
        if (id !== activeRoom) {
            socket.emit('ROOM:EXIT', {userName: user.username, roomId: activeRoom})

            setActiveRoom(id)
            if (window.isMobileVersion) history.push('/chat')
            socket.emit('ROOM:JOIN', {user: user, roomId: id})
        }
    }

    const handleRemove = (id: string) => {
        deleteRoom(id)
    }

    const handleReload = () => {
        loadRooms()
    }

    return (
        <Container>
            <Header handleNewRoom={handleNewRoom} handleReload={handleReload}/>
            <Row>
                <Input
                    icon={'search'}
                    handleChange={handleSearch}
                />
            </Row>
            <List
                userId={user.userId}
                handleRemove={handleRemove}
                handleChangeActive={handleChangeActive}
                filteredRooms={filteredRooms}
                activeRoom={activeRoom}
                rooms={rooms}
            />
        </Container>
    )
}


const mapStateToProps = (state: AllRoomsContainerComponentStore) => ({
    rooms: state.rooms.rooms,
    user: state.user,
    filteredRooms: state.rooms.filteredRooms,
    activeRoom: state.rooms.activeRoom
})

const mapDispatchToProps = (dispatch: (arg0: AllRoomsContainerComponentDispatch) => void) => ({
    setFilteredRooms: (filteredRooms: IRoom[] | null | []) => dispatch(setFilteredRooms(filteredRooms)),
    setActiveRoom: (room: string | null) => dispatch(setActiveRoom(room)),
    createRoom: (data: { userId: string, title: string }) => dispatch(createRoomStart(data)),
    deleteRoom: (id: string) => dispatch(deleteRoomStart(id)),
    loadRooms: () => dispatch(loadRoomsStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllRoomsContainer)