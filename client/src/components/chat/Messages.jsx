import React, {useEffect} from 'react';
import styled, {css} from 'styled-components';
import {connect} from "react-redux";

import {getTime} from "../../utils/dateFormatter";

const Container = styled.div`
  height: 100vh;
  padding: 10px 5px;
  position: relative;
  box-sizing: border-box;
  overflow-y: auto;
`;

const Message = styled.div`
  position: relative;
  min-height: 40px;
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

const Name = styled.div`
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

const Messages = ({messages}) => {
    useEffect(() => {
        document.getElementById('last-message')?.scrollIntoView()
    })

    return (
        <Container id="messages">
            {messages.map((message, index) => (
                <Message personal={!message.from} id={index === messages.length - 1 ? "last-message" : ''} key={index}>
                    <Name personal={!message.from}>{message.from} {getTime(message.date)}</Name>
                    {message.text}
                </Message>
            ))}
        </Container>
    );
}

export default Messages
