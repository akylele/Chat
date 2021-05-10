import React, {useState} from 'react';
import styled from "styled-components";

import Input from "../Basic/Input";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 15px;
  box-shadow: 0 0 5px rgb(0 0 0 / 20%);
`;


const NewMessage = (props) => {
    const [message, setMessage] = useState('')

    const inputChangeValue = (e) => {
        setMessage(e.target.value)
    }

    const handleMessage = () => {
        if (message.length) {
            setMessage('')
            props.sendMessage(message)
        }
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            handleMessage()
        }
    }

    return (
        <Container>
            <Input
                onKeyPress={handleKeyPress}
                value={message}
                icon={'send'}
                handleClick={handleMessage}
                handleChange={(e) => inputChangeValue(e)}
            />
        </Container>
    );
}

export default NewMessage;
