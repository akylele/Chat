import React from 'react'
import styled from 'styled-components';

import Item from "./Item";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
`;

const List = ({filteredChats, chats, activeChat, handleChangeActive}) => {

    return (
        <Container>
            {(filteredChats || chats).map((chat, index) => (
                <Item
                    active={chat._id === activeChat}
                    key={index}
                    chat={chat}
                    handleChangeActive={handleChangeActive}
                />
            ))}
        </Container>
    )
}

export default List