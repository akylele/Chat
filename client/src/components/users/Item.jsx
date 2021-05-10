import React from 'react'
import styled, {css} from 'styled-components';

const Block = styled.div`
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
  display: flex;
  min-height: 40px;
  background-color: white;
  flex-direction: row;
  text-overflow: ellipsis;
`;

const Item = (props) => (
    <Block>
            <span>{props.user.name}{props.creator && ' - создатель'}</span>
    </Block>
)

export default Item