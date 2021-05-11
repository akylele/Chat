import React from 'react'
import styled from 'styled-components';

import Item from "./Item";
import {UserStore} from "../../redux/actions/types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
`;


const List = (props: { users: UserStore[]; creator: string }) => (
    <Container>
        {props.users.map((user: UserStore, index: number) => (
            <Item
                creator={props.creator === user._id}
                user={user}
                key={index}
            />
        ))}
    </Container>
)

export default List