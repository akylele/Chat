import React from 'react'
import styled from 'styled-components';
import Title from "../Basic/Title";

const Header = (props) => (
    <Title>
        Участники ({props.length})
    </Title>
)

export default Header