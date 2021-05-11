import React from 'react'
import styled from "styled-components";
import {IHeaderChat} from "./types";

const Icon = styled.i`
  position: absolute;
  line-height: 50px;
  margin: 0 15px;
`

const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 50px;
`

const Title = styled.h5`
  font-size: 20px;
  margin: 0;
  width: 100%;
  text-align: center;
  height: 50px;
  line-height: 50px;
`

const HeaderChat = ({currentRoom, handleBack}: IHeaderChat) => (
    <Row>
        <Icon
            className="material-icons"
            onClick={handleBack}
        >
            list
        </Icon>
        <Title>{currentRoom.title}</Title>
    </Row>
)

export default HeaderChat