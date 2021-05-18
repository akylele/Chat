import React from 'react'
import styled from 'styled-components';

import Item from "./Item";
import {IUserData} from "../../redux/actions/types";
import {IListComponent} from "./types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
`;


const List = (props: IListComponent) => (
    <Container>
        {props.users.map((user: IUserData, index: number) => (
            <Item
                creator={props.creator === user._id}
                user={user}
                key={index}
            />
        ))}
    </Container>
)

export default List