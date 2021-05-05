import React from 'react'
import styled, {css} from 'styled-components';

import {getTime} from "../../utils/dateFormatter";

const Block = styled.div`
  width: calc(100% - 20px);
  margin-bottom: 20px;
  padding: 10px;
  display: flex;
  min-height: 60px;
  background-color: white;
  border-radius: 15px;
  flex-direction: row;

  ${props => props.active && css`
    background-color: rgb(47, 52, 67);
    color: white
  `}
  
`;

const Photo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 45px;
    width: 70px;
    height: 70px;
  }
`;

const Title = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden
`;

const Message = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden
`;

const Quantity = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 45px;
  background-color: #44a1f1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Date = styled.div`
  white-space: nowrap;
`;

const Col = styled.div`;
  display: flex;
  width: 60rem;
  flex-direction: column;
  justify-content: space-around;
  padding: 2px 5px;
  overflow: hidden;
  
  ${props => props.width && css`
    width: ${props.width}rem;
  `}

  ${props => props.end && css`
    align-items: flex-end;
  `}
`;

const Item = ({active, handleChangeActive, chat}) => (
    <Block
        active={active}
        onClick={() => handleChangeActive(chat._id)}
    >
        <Col width={20}>
            <Photo>
                <img src="https://mk0leanfrontierqpi7o.kinstacdn.com/wp-content/uploads/2018/12/logo-placeholder-png.png" alt=""/>
            </Photo>
        </Col>
        <Col width={55}>
            <Title>{chat.title}</Title>
            <Message>{chat.lastMessage}</Message>
        </Col>
        <Col end width={25}>
            {chat.dateOfLastMessage && <Date>{getTime(chat.dateOfLastMessage)}</Date>}
            {chat.counter && <Quantity>{chat.counter}</Quantity>}
        </Col>
    </Block>
)

export default Item