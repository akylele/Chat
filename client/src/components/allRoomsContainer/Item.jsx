import React from 'react'
import styled, {css} from 'styled-components';

import {getTime} from "../../utils/dateFormatter";

const Block = styled.div`
  width: 100%;
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

const Icon = styled.i`
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
  //overflow: hidden;

  ${props => props.width && css`
    width: ${props.width}rem;
  `}

  ${props => props.end && css`
    align-items: flex-end;
  `}
`;

const Item = ({active, handleChangeActive, room, handleRemove, userId}) => (
    <Block
        active={window.isMobileVersion ? false : active }
    >
        {room.creator === userId && <Col width={20}>
            <Icon
                className="material-icons"
                onClick={() => handleRemove(room._id)}
            >
                delete
            </Icon>
        </Col>}
        <div
            onClick={() => handleChangeActive(room._id)}
        >
            <Col width={55}>
                <Title>{room.title}</Title>
                <Message>{room.lastMessage}</Message>
            </Col>
            <Col end width={25}>
                {room.dateOfLastMessage && <Date>{getTime(room.dateOfLastMessage)}</Date>}
                {room.counter && <Quantity>{room.counter}</Quantity>}
            </Col>
        </div>

    </Block>
)

export default Item