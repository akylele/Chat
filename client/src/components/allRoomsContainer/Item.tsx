import React from 'react'
import styled, {css} from 'styled-components';

import {getTimeShort} from "../../utils/dateFormatter";
import {IItemComponent} from "./types";

const Block = styled.div<{active: boolean}>`
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

const Title = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: bold;
`;

const Message = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden
`;

const Date = styled.div`
  white-space: nowrap;
`;

const Row = styled.div`
  height: 50%;
  margin: 0;
  display: flex;
  justify-content: space-between;
`

const Col = styled.div<{width: number}>`;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 5px;

  ${props => props.width && css`
    width: ${props.width}%;
  `}
`;

const Item = ({active, handleChangeActive, room, handleRemove, userId}: IItemComponent) => (
    <Block
        active={window.isMobileVersion ? false : active}
    >

        <Col width={room.creator === userId ? 80 : 100}
             onClick={() => handleChangeActive(room._id)}
        >
            <Row>
                <Title>{room.title}</Title>
                {room.dateOfLastMessage && <Date>{getTimeShort(room.dateOfLastMessage)}</Date>}
            </Row>
            <Row>
                <Message>{room.lastMessage}</Message>
            </Row>
        </Col>
        {room.creator === userId &&
        <Col width={20}>
            <Icon
                className="material-icons"
                onClick={() => handleRemove(room._id)}
            >
                delete
            </Icon>
        </Col>}
    </Block>
)

export default Item