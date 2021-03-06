import React from 'react'
import styled from 'styled-components';

import Item from "./Item";
import {IRoom} from "../../redux/actions/types";
import {ListComponent} from "./types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const List = ({filteredRooms, rooms, activeRoom, handleChangeActive, handleRemove, userId}: ListComponent) => {

    return (
        <Container>
            {(filteredRooms || rooms).map((room: IRoom, index: number) => (
                <Item
                    userId={userId}
                    active={room._id === activeRoom}
                    key={index}
                    room={room}
                    handleChangeActive={handleChangeActive}
                    handleRemove={handleRemove}
                />
            ))}
        </Container>
    )
}

export default List