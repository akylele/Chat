import React from 'react'
import styled from 'styled-components';
import {Room, User} from "../../redux/actions/types";

const Details = styled.details`
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 15px;
  z-index: 1000;
  width: 100%;
  box-shadow: 0 8px 6px 1px #e2e1e1;
  background-color: white;
`

const Summary = styled.summary`

`

const Ul = styled.ul`
  padding: 0 15px!important;
`


const UsersListMobile = ({currentRoom}: {currentRoom: Room}) => (
    <Details>
        <Summary>Пользователи</Summary>
        <Ul>
            {currentRoom.users.map((user: User) => (
                <li>{user.name}{' '}{currentRoom.creator === user._id && ' - создатель'}</li>
            ))}
        </Ul>
    </Details>
)

export default UsersListMobile