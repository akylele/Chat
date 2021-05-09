import React, {useState} from 'react'
import styled from "styled-components";
import {connect} from "react-redux";

import {loginStart} from "../redux/actions/user";
import Input from "../components/Basic/Input";
import {socket} from "../socket";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0 15px;
  background-color: rgb(245, 245, 245);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 30px;
  text-align: center;
`;

const Confirm = styled.button`
  border: none;
  margin: 20px auto;
  background: white;
  padding: 5px 15px;
  height: 26px;
  border-radius: 15px;
  outline: none;
  color: black;
  position: relative;
`;

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [socketId, setSocketId] = useState(null)

    socket.on('CONNECTED', ({socketId}) => {
        setSocketId(socketId)
    })

    const handleChangeName = (e) => {
        setUsername(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirm = () => {
        props.loginStart({username, password, socketId})
    }

    return (
        <Container>
            <Title>Введите имя</Title>
            <Input
                handleChange={handleChangeName}
            />
            <Title>Введите пароль</Title>
            <Input
                handleChange={handleChangePassword}
            />
            <Confirm onClick={handleConfirm}>
                Войти
            </Confirm>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => ({
    loginStart: (data) => dispatch(loginStart(data))
})

export default connect(null, mapDispatchToProps)(Login)