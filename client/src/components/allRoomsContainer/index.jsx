import React from 'react'
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


const AllRoomsContainer = (props) => {

    const handleNewRoom = (title) => {
        props.createRoom({userId: props.user.userId, title})
    }

    const handleSearch = (e) => {
        if (e.target.value) {
            return props.setFilteredRooms(props.rooms.filter(elem => elem.title.includes(e.target.value)))
        }

        return props.setFilteredRooms(null)
    }

    const handleChangeActive = async (id) => {
        if (id !== props.activeRoom) {
            const prevActiveRoom = props.activeRoom
            socket.emit('ROOM:EXIT', {userName: props.user.username, roomId: prevActiveRoom})

            props.setActiveRoom(id)
            if (window.isMobileVersion) props.history.push('/chat')
            socket.emit('ROOM:JOIN', {user: props.user, roomId: id})
        }
    }

    const handleRemove = (id) => {
        props.deleteRoom(id)
    }

    const handleReload = () => {
        props.loadRooms()
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
                userId={props.user.userId}
                handleRemove={handleRemove}
                handleChangeActive={handleChangeActive}
                filteredRooms={props.filteredRooms}
                activeRoom={props.activeRoom}
                rooms={props.rooms}
            />
        </Container>
    )
}


const mapStateToProps = (state) => ({
    rooms: state.rooms.rooms,
    user: state.user,
    filteredRooms: state.rooms.filteredRooms,
    activeRoom: state.rooms.activeRoom
})

const mapDispatchToProps = (dispatch) => ({
    setFilteredRooms: rooms => dispatch(setFilteredRooms(rooms)),
    setActiveRoom: room => dispatch(setActiveRoom(room)),
    createRoom: data => dispatch(createRoomStart(data)),
    deleteRoom: (id) => dispatch(deleteRoomStart(id)),
    loadRooms: () => dispatch(loadRoomsStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllRoomsContainer)