import React from 'react'
import styled from 'styled-components';
import {ICol} from "./types";

const ColContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Col = ({children}: ICol) => (
    <ColContainer>
        {children}
    </ColContainer>
)

export default Col