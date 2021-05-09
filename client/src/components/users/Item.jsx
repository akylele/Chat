import React from 'react'
import styled, {css} from 'styled-components';

import avatar from '../../images/9570A0DC-3178-42FF-ABB9-AD3BBA725EA5_1_105_c.jpeg'

const Block = styled.div`
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
  display: flex;
  min-height: 40px;
  background-color: white;
  border-radius: 15px;
  flex-direction: row;
  text-overflow: ellipsis;
`;

const Col = styled.div`;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 5px;
  overflow: hidden;
  
  ${props => props.width && css`
    width: ${props.width}rem;
  `}

  ${props => props.end && css`
    align-items: flex-end;
  `}
`;

const Item = (props) => (
    <Block>
        <Col>
            <span>{props.user.name}{props.creator && ' - создатель'}</span>
        </Col>
    </Block>
)

export default Item