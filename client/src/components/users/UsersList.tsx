import React from 'react';
import styled from "styled-components";

import Header from "./Header";
import List from "./List";
import Row from "../Basic/Row";
import {User, UserStore} from "../../redux/actions/types";

const Container = styled.div`
  width: 40%;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 0 0 5px rgb(0 0 0 / 20%);
`;


const UsersList = (props: { currentRoom: { users: UserStore[]; creator: string; } }) => {
    const {users, creator} = props.currentRoom
    return (
        <Container>
            <Row>
                <Header length={users.length}/>
            </Row>
            <List users={users} creator={creator}/>
        </Container>
    );
}

export default UsersList;
