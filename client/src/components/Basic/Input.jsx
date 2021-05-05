import React from 'react'
import styled from 'styled-components';

const InputInnerWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 15px;
`;

const Wrap = styled.div`
  width: 100%;
  top: 50%;
`;

const InputValue = styled.input`
  width: 100%;
  border: none;
  background: white;
  padding: 5px 15px;
  height: 26px;
  border-radius: 15px 0 0 15px;
  outline: none;
  color: black;
`;

const Button = styled.button`
  width: 40px;
  height: 36px;
  border: none;
  background: white;
  text-align: center;
  color: black;
  border-radius: 0 15px 15px 0;
  cursor: pointer;
  font-size: 20px;
`;

const Icon = styled.i`
  line-height: 36px
`

const Input = ({icon, handleChange, handleClick}) => (
    <Wrap>
        <InputInnerWrap>
            <InputValue onChange={handleChange}/>
            <Button>
                {icon && (
                    <Icon
                        className="material-icons"
                        onClick={handleClick}
                    >
                        {icon}
                    </Icon>
                )}
            </Button>
        </InputInnerWrap>
    </Wrap>
)

export default Input