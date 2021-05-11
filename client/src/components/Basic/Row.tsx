import React from 'react'
import styled, {css} from 'styled-components';
import {IRow} from "./types";

const RowContainer = styled.div<{position: string}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  
  ${props => props.position === 'center' && css`
    justify-content: center;
  `}

  ${props => props.position === 'left' && css`
    justify-content: flex-start;
  `}

  ${props => props.position === 'right' && css`
    justify-content: flex-end;
  `}

  ${props => props.position === 'sb' && css`
    justify-content: space-between;
  `}

  ${props => props.position === 'sa' && css`
    justify-content: space-around;
  `}
`;

const Row = ({position, children}: IRow) => (
    <RowContainer position={position}>
        {children}
    </RowContainer>
)

export default Row