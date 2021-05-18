import React, {useEffect} from 'react';
import styled, {css} from 'styled-components';

import {getTime} from "../../utils/dateFormatter";
import {IMessage} from '../../redux/actions/types'

const Container = styled.div`
  height: 100vh;
  padding: 10px 5px;
  position: relative;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div<{personal: boolean}>`
  position: relative;
  padding: 10px 10px 20px 10px;
  border-radius: 15px 5px 15px 5px;
  left: 0;
  width: 100%;
  display: inline-block;
  box-sizing: border-box;
  box-shadow: 0 0 5px rgb(0 0 0 / 20%);
  background: rgba(0, 0, 0, .03);
  margin: 0 auto 15px auto;

  ${props => props.personal && css`
    border-radius: 5px 15px 5px 15px;
    background: #44a1f1;
    color: white
  `}
`;

const ServiceMessage = styled.div`
  box-shadow: none;
  width: min-content;
  white-space: nowrap;
  border-radius: 15px;
  padding: 5px;
  background-color: #b9b9b9;
  opacity: 0.8;
  margin: 0 auto 15px auto;
font-size: 11px;
`

const Name = styled.div<{personal:boolean}>`
  position: absolute;
  padding: 5px 10px;
  bottom: 0;
  font-size: 10px;
  color: black;
  white-space: nowrap;
  left: 0;

  ${props => props.personal && css`
    right: 0;
    left: initial;
  `}
`

const Messages = ({messages, username}:{messages: IMessage[], username: string}) => {
    const personalMessage = (message: IMessage) => message.from === username

    useEffect(() => {
        document.getElementById('last-message')?.scrollIntoView()
    })

    return (
        <Container id="messages">
            {messages.map((message: IMessage, index: number) => {
                if (message.from === 'service') {
                    return (
                        <ServiceMessage
                            key={index}
                            id={index === messages.length - 1 ? "last-message" : ''}
                        >
                            {message.text}{' '}{getTime(message.date)}
                        </ServiceMessage>
                    )
                } else {
                    return (
                        <Message
                            personal={personalMessage(message)}
                            id={index === messages.length - 1 ? "last-message" : ''}
                            key={index}
                        >
                            <Name personal={personalMessage(message)}>
                                {personalMessage(message) ? 'Вы' : message.from} {getTime(message.date)}
                            </Name>
                            {message.text}
                        </Message>
                    )
                }
            })}
        </Container>
    );
}

export default Messages
