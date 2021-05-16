import React from 'react';
import styled from "styled-components";
import {connect} from "react-redux";

import {logoutStart} from "../redux/actions/user";

import Header from "../components/Basic/Header";
import AllRoomsContainer from "../components/allRoomsContainer";
import Chat from "../components/chat";
import {IAllRooms} from "./types";
import {IUserStore} from "../redux/actions/types";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 50px);

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const AllRooms = (props: IAllRooms) => {
    const handleLogout = () => {
        props.logout(props.user.userId)
    }

    return (
        <>
            <Header handleLogout={handleLogout} user={props.user}/>
            <Container>
                <AllRoomsContainer history={props.history}/>
                {!window.isMobileVersion && <Chat/>}
            </Container>
        </>
    )
}


const mapStateToProps = (state: { user: IUserStore }) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch: (arg0: { type: string; userId: string; }) => void) => ({
    logout: (userId: string) => dispatch(logoutStart(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllRooms)
