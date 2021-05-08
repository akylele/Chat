import React, {useState} from 'react'
import styled from "styled-components";
import {connect} from "react-redux";

import {loginStart} from "../redux/actions/user";
import Input from "../components/Basic/Input";


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

    const handleChangeName = (e) => {
        setUsername(e.target.value)
    }

    const handleConfirm = () => {
        props.loginStart(username)
    }

    return (
        <Container>
            <Title>Введите имя чтобы продолжить</Title>
            <Input
                handleChange={handleChangeName}
            />
            <Confirm onClick={handleConfirm}>
                Войти
            </Confirm>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => ({
    loginStart: (username) => dispatch(loginStart(username))
})

export default connect(null, mapDispatchToProps)(Login)