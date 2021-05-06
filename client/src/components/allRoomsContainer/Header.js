import React, {useState} from 'react'

import NewRoom from "./NewRoom";
import CircleButton from "../Basic/CircleButton";
import Title from "../Basic/Title";
import Row from "../Basic/Row";
import Col from "../Basic/Col";

const Header = (props) => {
    const [isAdd, setIsAdd] = useState(false)

    const handleAdd = () => {
        setIsAdd(!isAdd)
    }

    const handleNewRoom = (value) => {
        setIsAdd(!isAdd)
        props.handleNewRoom(value)
    }

    return (
        <>
            <Row position={'sb'}>
                <Title text={'Чаты'}/>
                <CircleButton
                    icon={isAdd ? 'remove' : 'add'}
                    handleClick={handleAdd}
                />
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