import React, {useState} from 'react';
import styled from "styled-components";
import Input from "../Basic/Input";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 15px;
  box-shadow: 0 0 5px rgb(0 0 0 / 20%);
`;


const NewMessage = ({sendMessage}) => {
    const [message, setMessage] = useState('')
    window.onkeypress = handle;

    const inputChangeValue = (e) => {
        setMessage(e.target.value)
    }

    function handle(e) {
        if ((e.keyCode === 13 && message.length) || message.length) {
            setMessage('')
            sendMessage(message)
        }
    }


    return (
        <Container>
            <Input
                icon={'send'}
                handleClick={handle}
                handleChange={(e) => inputChangeValue(e)}
            />
        </Container>
    );
}

export default NewMessage;
