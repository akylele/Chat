import React from 'react'
import styled from 'styled-components';
import {ICircleButtonComponent} from "./types";

const CircleButtonContainer = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 45px;
  background-color: #44a1f1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
`;

const CircleButton = ({icon, handleClick}: ICircleButtonComponent) => (
    <CircleButtonContainer onClick={handleClick}>
        <i className="material-icons">{icon}</i>
    </CircleButtonContainer>
)

export default CircleButton