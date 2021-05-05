import React from 'react'
import styled from 'styled-components';

import Item from "./Item";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
`;


const List = (props) => (
    <Container>
        {props.users.map((user, index) => (
            <Item
                user={user}
                key={index}
            />
        ))}
    </Container>
)

export default List