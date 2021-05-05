import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {connect} from "react-redux";

import NewMessage from "./NewMessage";
import Messages from "./Messages";
import UsersList from "../users";

const Container = styled.div`
  max-width: 100rem;
  min-width: 30rem;
  width: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  justify-content: flex-end;
`;

const NotifyBlock = styled.div`
  font-size: 32px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Chat = (props) => {
    // const [messages, setMessages] = useState([])
    const [currentRoom, setCurrentRoom] = useState()
    const windowWidth = window.innerWidth

    useEffect(() => {
        if (props.activeRoom !== null) {
            setCurrentRoom(props.rooms.filter(room => room.id === props.activeRoom)[0])
            // setMessages(props.rooms.filter(client => client.id === props.activeChat)[0].messages)
        }
    }, [props.rooms])

    const sendMessage = (message) => {
        // setMessages(messages.concat({
        //     date: Date.now(),
        //     text: message,
        // }))
    }

    if (props.activeRoom === null) {
        return (
            <Container>
                <NotifyBlock>выберите чат</NotifyBlock>
            </Container>
        )
    }

    if (!currentRoom?.messages) {
        return (
            <>
                <Container>
                    <NotifyBlock>сообщений нет</NotifyBlock>
                    <NewMessage sendMessage={sendMessage}/>
                </Container>
                {windowWidth > 1050 && <UsersList users={currentRoom?.usersOnline || []}/>}
            </>
        )
    }

    return (
        <>
            <Container>
                {!currentRoom?.messages ?
                    <NotifyBlock>сообщений нет</NotifyBlock> :
                    <Messages messages={currentRoom.messages || []}/>}
                <NewMessage sendMessage={sendMessage}/>
            </Container>
            {windowWidth > 1050 && <UsersList users={currentRoom.usersOnline || []}/>}
        </>
    );
}

const mapStateToProps = (state) => ({
    rooms: state.rooms.rooms,
    activeRoom: state.rooms.activeRoom
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
