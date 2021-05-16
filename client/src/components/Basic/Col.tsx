import React from 'react'
import styled from 'styled-components';
import {IColComponent} from "./types";

const ColContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Col = ({children}: IColComponent) => (
    <ColContainer>
        {children}
    </ColContainer>
)

export default Col