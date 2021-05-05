import React from 'react';
import styled from "styled-components";
import {connect} from "react-redux";

import Header from "../components/Basic/Header";
import AllRooms from "../components/allRooms";
import Chat from "../components/chat";
import {logoutStart} from "../redux/actions/user";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 50px);
`;

const MainContainer = (props) => {

    const handleLogout = () => {
        props.logout(props.user.userId)
    }

    return (
        <>
            <Header handleLogout={handleLogout} user={props.user}/>
            <Container>
                <AllRooms/>
                <Chat/>
            </Container>
        </>
    )
}


const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    logout: (userId) => dispatch(logoutStart(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
