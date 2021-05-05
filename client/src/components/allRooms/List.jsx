import React from 'react'
import styled from 'styled-components';

import Item from "./Item";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
`;

const List = ({filteredRooms, rooms, activeRoom, handleChangeActive}) => {

    return (
        <Container>
            {(filteredRooms || rooms).map((room, index) => (
                <Item
                    active={room._id === activeRoom}
                    key={index}
                    room={room}
                    handleChangeActive={handleChangeActive}
                />
            ))}
        </Container>
    )
}

export default List