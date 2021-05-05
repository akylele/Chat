import React from 'react'
import styled from 'styled-components';

const TitleContainer = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin: 10px 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden
`;

const Title = ({text}) => (
    <TitleContainer>
        {text}
    </TitleContainer>
)

export default Title