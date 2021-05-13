import React from 'react'
import styled from 'styled-components';

import CircleButton from "./CircleButton";
import {IHeaderComponent} from "./types";

const Name = styled.h2`
  font-size: 26px;
  font-weight: bold;
  margin: 10px 20px;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: bold;
  margin: 10px 20px;
`;

const Container = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: rgb(245, 245, 245);
  box-shadow: 0 0 5px rgb(0 0 0 / 20%);
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  margin: 0 20px;
`;

const Header = (props: IHeaderComponent) => (
    <Container>
        <Title>
            Chat
        </Title>
        {props.user?.username && <Wrapper>
            <Name>
                {props.user.username}
            </Name>
            <CircleButton
                icon={'exit_to_app'}
                handleClick={props.handleLogout}
            />
        </Wrapper>}
    </Container>
)

export default Header