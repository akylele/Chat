import React from 'react'
import styled from 'styled-components';

import {UserStore} from "../../redux/actions/types";

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

const Item = ({user, creator}: {user: UserStore, creator: boolean}) => (
    <Block>
            <span>{user.name}{creator && ' - создатель'}</span>
    </Block>
)

export default Item