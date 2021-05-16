import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styled from "styled-components";

import Input from "../Basic/Input";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 15px;
  box-shadow: 0 0 5px rgb(0 0 0 / 20%);
`;


const NewMessage = (props: { sendMessage: (arg0: string) => void; }) => {
    const [message, setMessage] = useState('')

    const inputChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const handleMessage = () => {
        if (message.length) {
            setMessage('')
            props.sendMessage(message)
        }
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
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
                handleChange={(e: ChangeEvent<HTMLInputElement>) => inputChangeValue(e)}
            />
        </Container>
    );
}

export default NewMessage;
