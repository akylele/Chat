import React from 'react'
import styled, {css} from 'styled-components';

import avatar from '../../images/9570A0DC-3178-42FF-ABB9-AD3BBA725EA5_1_105_c.jpeg'

const Block = styled.div`
  width: calc(100% - 20px);
  margin-bottom: 10px;
  padding: 5px;
  display: flex;
  min-height: 40px;
  background-color: white;
  border-radius: 15px;
  flex-direction: row;
`;

const Photo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 8px;
    width: 35px;
    height: 35px;
  }
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
        <Col width={20}>
            <Photo>
                <img src={avatar} alt=""/>
            </Photo>
        </Col>
        <Col width={80}>
            <span>{props.user.name}</span>
        </Col>
    </Block>
)

export default Item