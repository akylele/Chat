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

  @media (max-width: 500px) {
    height: calc(100vh - 50px);
    max-width: 100%;
    min-width: 100%;
  }
`;

const NotifyBlock = styled.div`
  font-size: 32px;
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

const Details = styled.details`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  box-shadow: 0 0 10px 1px grey;
  background-color: white;
`

const Summary = styled.summary`

`

const Title = styled.h5`
  font-size: 20px;
  margin: 0;
  width: 100%;
  text-align: center;
  height: 50px;
  line-height: 50px;
`

const Chat = (props) => {
    const [currentRoom, setCurrentRoom] = useState({
        usersOnline: [],
        messages: []
    })

    useEffect(() => {
        if (props.activeRoom !== null) {
            setCurrentRoom(props.rooms.filter(room => room._id === props.activeRoom)[0])
        }
    }, [props.rooms])

    const sendMessage = (message) => {
    }

    if (props.activeRoom === null) {
        return (
            <Container>
                <NotifyBlock>выберите чат</NotifyBlock>
            </Container>
        )
    }

    if (currentRoom.messages.length < 1) {
        return (
            <>
                {window.isMobileVersion &&
                <Title>{currentRoom.title}</Title>}
                <Container>
                    {window.isMobileVersion &&
                    <Details>
                        <Summary>Пользователи</Summary>
                        <ul>
                            {currentRoom.usersOnline.map(user => (
                                <li>{user.name}</li>
                            ))}
                        </ul>
                    </Details>}
                    <NotifyBlock>сообщений нет</NotifyBlock>
                    <NewMessage sendMessage={sendMessage}/>
                </Container>
                {!window.isMobileVersion && <UsersList users={currentRoom.usersOnline}/>}
            </>
        )
    }

    return (
        <>
            {window.isMobileVersion &&
            <Title>{currentRoom.title}</Title>}
            <Container>
                {window.isMobileVersion &&
                <Details>
                    <Summary>Пользователи</Summary>
                    <ul>
                        {currentRoom.usersOnline.map(user => (
                            <li>{user.name}</li>
                        ))}
                    </ul>
                </Details>}
                {!currentRoom.messages ?
                    <NotifyBlock>сообщений нет</NotifyBlock> :
                    <Messages messages={currentRoom.messages}/>}
                <NewMessage sendMessage={sendMessage}/>
            </Container>
            {!window.isMobileVersion && <UsersList users={currentRoom.usersOnline}/>}
        </>
    );
}

const mapStateToProps = (state) => ({
    rooms: state.rooms.rooms,
    activeRoom: state.rooms.activeRoom
})

export default connect(mapStateToProps, null)(Chat)
