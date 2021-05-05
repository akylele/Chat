import React, {useState} from 'react'

import NewChat from "./NewChat";
import CircleButton from "../Basic/CircleButton";
import Title from "../Basic/Title";
import Row from "../Basic/Row";
import Col from "../Basic/Col";

const Header = (props) => {
    const [isAdd, setIsAdd] = useState(false)

    const handleAdd = () => {
        setIsAdd(!isAdd)
    }

    const handleNewChat = (value) => {
        setIsAdd(!isAdd)
        props.handleNewChat(value)
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
                    <NewChat handleNewChat={handleNewChat}/>
                </Col>
            )}
        </>
    )
}

export default Header