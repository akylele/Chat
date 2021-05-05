import React from 'react';
import styled from "styled-components";

import Header from "./Header";
import List from "./List";
import Row from "../Basic/Row";

const Container = styled.div`
  max-width: 20rem;
  width: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 0 0 5px rgb(0 0 0 / 20%);
`;


const UsersList = (props) => {
    return (
        <Container>
            <Row>
                <Header length={props.users.length}/>
            </Row>
            <List users={props.users}/>
        </Container>
    );
}

export default UsersList;
