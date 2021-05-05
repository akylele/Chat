import React from 'react'
import styled from 'styled-components';
import {connect} from "react-redux";

import List from "./List";
import Header from "./Header";
import {createRoomStart, setActiveRoom, setFilteredRooms} from "../../redux/actions/rooms";
import Input from "../Basic/Input";
import Row from "../Basic/Row";

const Container = styled.div`
  min-width: 400px;
  max-width: 400px;
  padding: 10px 20px;
  background-color: rgb(245, 245, 245);
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
`;


const AllRooms = (props) => {

    const handleNewRoom = (title) => {
        props.createRoom(title)
    }

    const handleSearch = (e) => {
        if (e.target.value) {
            return props.setFilteredRooms(props.rooms.filter(elem => elem.title.includes(e.target.value)))
        }

        return props.setFilteredRooms(null)
    }

    const handleChangeActive = (id) => {
        props.setActiveRoom(id)
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
    filteredRooms: state.rooms.filteredRooms,
    activeRoom: state.rooms.activeRoom
})

const mapDispatchToProps = (dispatch) => ({
    setFilteredRooms: rooms => dispatch(setFilteredRooms(rooms)),
    setActiveRoom: room => dispatch(setActiveRoom(room)),
    createRoom: title => dispatch(createRoomStart(title)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllRooms)