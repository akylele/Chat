import React, {useState} from 'react'

import Input from "../Basic/Input";
import Row from "../Basic/Row";
import Title from "../Basic/Title";

const NewRoom = ({handleNewRoom}) => {
    const [value, setValue] = useState('')

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            handleNewRoom(value)
        }
    }

    return (
        <>
            <Row>
                <Title text={'Введите название чата'}/>
            </Row>
            <Row>
            <Input
                onKeyPress={handleKeyPress}
                icon={'add'}
                handleChange={(e) => setValue(e.target.value)}
                handleClick={() => handleNewRoom(value)}
            />
            </Row>
        </>
    )
}

export default NewRoom