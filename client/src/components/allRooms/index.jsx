import React from 'react'
import styled from 'styled-components';
import {connect} from "react-redux";

import List from "./List";
import Header from "./Header";
import {createChatStart, setActiveChat, setFilteredChats} from "../../redux/actions/rooms";
import Input from "../Basic/Input";
import Row from "../Basic/Row";

const Container = styled.div`
  min-width: 400px;
  max-width: 400px;
  padding: 10px 20px;
  background-color: rgb(245, 245, 245);
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
`;


const AllChats = (props) => {

    const handleNewChat = (title) => {
        props.createChat(title)
    }

    const handleSearch = (e) => {
        if (e.target.value) {
            return props.setFilteredChats(props.chats.filter(elem => elem.title.includes(e.target.value)))
        }

        return props.setFilteredChats(null)
    }

    const handleChangeActive = (id) => {
        props.setActiveChat(id)
    }

    return (
        <Container>
            <Header handleNewChat={handleNewChat}/>
            <Row>
                <Input
                    icon={'search'}
                    handleChange={handleSearch}
                />
            </Row>
            <List
                handleChangeActive={handleChangeActive}
                filteredChats={props.filteredChats}
                activeChat={props.activeChat}
                chats={props.chats}
            />
        </Container>
    )
}


const mapStateToProps = (state) => ({
    chats: state.chats.chats,
    filteredChats: state.chats.filteredChats,
    activeChat: state.chats.activeChat
})

const mapDispatchToProps = (dispatch) => ({
    setFilteredChats: chats => dispatch(setFilteredChats(chats)),
    setActiveChat: chat => dispatch(setActiveChat(chat)),
    createChat: title => dispatch(createChatStart(title)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllChats)