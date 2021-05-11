import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {connect} from "react-redux";

import {setActiveRoom} from "../../redux/actions/rooms";
import {socket} from "../../socket";

import NewMessage from "./NewMessage";
import Messages from "./Messages";
import UsersList from "../users/UsersList";
import UsersListMobile from "../users/UsersListMobile";
import HeaderChat from "./Header";
import {Room} from "../../redux/actions/types";
import {IChatDispatch, IChatProps, IChatStore} from "./types";

const Container = styled.div`
  width: 100%;
  padding: 25px 20px 10px 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  justify-content: flex-end;

  @media (max-width: 500px) {
    height: calc(100vh - 50px);
  }
`;

const NotifyBlock = styled.div`
  font-size: 26px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 500px) {
    width: 100%;
    text-align: center;
  }
`

const initialState: Room = {
    _id: '',
    messages: [],
    users: [],
    title: '',
    creator: '',
    dateOfLastMessage: '',
    lastMessage: ''
}

const Chat = (props: IChatProps) => {
    const [currentRoom, setCurrentRoom] = useState<Room>(initialState)

    useEffect(() => {
        if (props.activeRoom !== null && props.rooms.length > 0) {
            if (props.rooms.filter((room: Room) => room._id === props.activeRoom).length > 0) {
                setCurrentRoom(props.rooms.filter((room: Room) => room._id === props.activeRoom)[0])
            } else {
                setCurrentRoom(initialState)
                props.setActiveRoom(null)
            }
        } else {
            setCurrentRoom(initialState)
            props.setActiveRoom(null)
        }
    }, [props.rooms])

    const sendMessage = (message: string) => {
        socket.emit('ROOM:NEW_MESSAGE', {
            message, username: props.username, roomId: currentRoom._id
        })
    }

    if (props.activeRoom === null) {
        return (
            <Container>
                <NotifyBlock>выберите чат</NotifyBlock>
            </Container>
        )
    }

    const renderMessages = () => {
        if (currentRoom.messages.length === 0) {
            return <NotifyBlock>сообщений нет</NotifyBlock>
        }

        return <Messages messages={currentRoom.messages} username={props.username}/>
    }

    const handleBack = () => {
        const prevActiveRoom = props.activeRoom
        socket.emit('ROOM:EXIT', {userName: props.username, roomId: prevActiveRoom})

        props.setActiveRoom(null)
        props.history.push('/pickup')
    }

    return (
        <>
            {window.isMobileVersion && <HeaderChat currentRoom={currentRoom} handleBack={handleBack}/>}
            <Container>
                {window.isMobileVersion && <UsersListMobile currentRoom={currentRoom}/>}
                {renderMessages()}
                <NewMessage sendMessage={sendMessage}/>
            </Container>
            {!window.isMobileVersion && <UsersList currentRoom={currentRoom}/>}
        </>
    );
}

const mapStateToProps = (state: IChatStore) => ({
    rooms: state.rooms.rooms,
    activeRoom: state.rooms.activeRoom,
    username: state.user.username
})

const mapDispatchToProps = (dispatch: (arg0: IChatDispatch) => void) => ({
    setActiveRoom: (room: string) => dispatch(setActiveRoom(room)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Chat)
