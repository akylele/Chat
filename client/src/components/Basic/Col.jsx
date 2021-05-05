import React from 'react'
import styled, {css} from 'styled-components';

const ColContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

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

const Col = ({position, children}) => (
    <ColContainer position={position}>
        {children}
    </ColContainer>
)

export default Col