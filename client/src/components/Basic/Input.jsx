import React from 'react'
import styled from 'styled-components';

const InputInnerWrap = styled.div`
  width: 100% !important;
  position: relative !important;
  display: flex !important;
  border: 1px solid #ccc !important;
  border-radius: 15px !important;
`;

const Wrap = styled.div`
  width: 100% !important;
  top: 50% !important;
`;

const InputValue = styled.input`
  width: 100% !important;
  border: none !important;
  background: white !important;
  padding: 5px 15px !important;
  height: 26px !important;
  border-radius: 15px 0 0 15px !important;
  outline: none !important;
  color: black !important;
  margin: 0 !important;
  box-shadow: none !important;
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