import React from 'react'
import styled, {css} from 'styled-components';

const RowContainer = styled.div`
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

const Row = ({position, children}) => (
    <RowContainer position={position}>
        {children}
    </RowContainer>
)

export default Row