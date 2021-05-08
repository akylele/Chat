import React from 'react'
import styled from 'styled-components';
import {connect} from "react-redux";

import List from "./List";
import Header from "./Header";
import {
    createRoomStart,
    deleteRoomStart,
    loadRoomByIdStart,
    setActiveRoom,
    setFilteredRooms
} from "../../redux/actions/rooms";
import Input from "../Basic/Input";
import Row from "../Basic/Row";
import {socket} from '../../socket';
import {Toast} from "../../hooks/message.hook";

const Container = styled.div`
  min-width: 400px;
  max-width: 400px;
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
        props.createRoom({userId: props.userId, title})
    }

    const handleSearch = (e) => {
        if (e.target.value) {
            return props.setFilteredRooms(props.rooms.filter(elem => elem.title.includes(e.target.value)))
        }

        return props.setFilteredRooms(null)
    }

    const handleChangeActive = (id) => {
        socket.emit('ROOM:JOIN', {userName: props.userName, roomId: id})

        socket.on('SUCCESS-ROOM:JOIN', (data) => {
            console.log('==========>data', data)
            props.loadRoomById(id)
            props.setActiveRoom(id)
            if (window.isMobileVersion) props.history.push('/chat')
            Toast(data.message)
        })
        socket.on('ERROR-ROOM:JOIN', (data) => {
            Toast(data.message)
        })
    }

    const handleRemove = (id) => {
        props.deleteRoom(id)
    }

    return (
        <Container>
            <Header handleNewRoom={handleNewRoom}/>
            <Row>
                <Input
                    icon={'search'}
                    handleChange={handleSearch}
                />
            </Row>
            <List
                userId={props.userId}
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
    userId: state.user.userId,
    userName: state.user.username,
    filteredRooms: state.rooms.filteredRooms,
    activeRoom: state.rooms.activeRoom
})

const mapDispatchToProps = (dispatch) => ({
    setFilteredRooms: rooms => dispatch(setFilteredRooms(rooms)),
    setActiveRoom: room => dispatch(setActiveRoom(room)),
    createRoom: data => dispatch(createRoomStart(data)),
    loadRoomById: (id) => dispatch(loadRoomByIdStart(id)),
    deleteRoom: (id) => dispatch(deleteRoomStart(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllRoomsContainer)