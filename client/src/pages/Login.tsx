import React, {ChangeEvent, useState} from 'react'
import styled from "styled-components";
import {connect} from "react-redux";

import {loginStart} from "../redux/actions/user";
import {socket} from "../socket";

import Input from "../components/Basic/Input";
import { ILoginData } from '../api/types';
import {ILoginComponent} from "./types";


const Container = styled.div`
  width: 100%;
  max-width: 500px;
  height: 100vh;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 30px;
  text-align: center;
`;

const Confirm = styled.div`
  border: none;
  margin: 20px auto;
  background: white;
  padding: 5px 15px;
  height: 36px;
  line-height: 26px;
  border-radius: 15px;
  outline: none;
  color: black;
  position: relative;
  box-shadow: 0 0 10px 1px #e4e2e2;
`;

const Login = (props: ILoginComponent) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [socketId, setSocketId] = useState('')

    socket.on('CONNECTED', ({socketId}) => {
        setSocketId(socketId)
    })

    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
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
            <Input handleChange={handleChangePassword}/>
            <Confirm
                onClick={handleConfirm}
            >
                Войти
            </Confirm>
        </Container>
    )
}

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: ILoginData; }) => void) => ({
    loginStart: (data: ILoginData) => dispatch(loginStart(data))
})

export default connect(null, mapDispatchToProps)(Login)