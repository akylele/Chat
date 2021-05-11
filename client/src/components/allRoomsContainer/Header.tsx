import React, {useState} from 'react'
import styled from 'styled-components';

import NewRoom from "./NewRoom";
import CircleButton from "../Basic/CircleButton";
import Title from "../Basic/Title";
import Row from "../Basic/Row";
import Col from "../Basic/Col";
import {IHeader} from "./types";

const MiniRow = styled.div`
  display: flex;
  flex-direction: row;
`

const Header = (props: IHeader) => {
    const [isAdd, setIsAdd] = useState(false)

    const handleAdd = () => {
        setIsAdd(!isAdd)
    }

    const handleNewRoom = (value: string) => {
        setIsAdd(!isAdd)
        props.handleNewRoom(value)
    }

    return (
        <>
            <Row position={'sb'}>
                <Title text={'Чаты'}/>
                <MiniRow>
                    <CircleButton
                        icon={isAdd ? 'remove' : 'add'}
                        handleClick={handleAdd}
                    />
                    <CircleButton
                        icon={'update'}
                        handleClick={props.handleReload}
                    />
                </MiniRow>
            </Row>
            {isAdd && (
                <Col>
                    <NewRoom handleNewRoom={handleNewRoom}/>
                </Col>
            )}
        </>
    )
}

export default Header