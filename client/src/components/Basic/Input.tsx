import React, {KeyboardEvent, useRef} from 'react'
import styled, {css} from 'styled-components';

import {IInputComponent, IInputValue} from './types'

const InputInnerWrap = styled.div`
  width: 100% !important;
  position: relative !important;
  display: flex !important;
  border: 1px solid #ccc !important;
  border-radius: 15px !important;
`;

const Wrap = styled.div<{onKeyPress: React.KeyboardEventHandler<HTMLDivElement> & ((e: KeyboardEvent<HTMLInputElement>) => void) | undefined}>`
  width: 100% !important;
  top: 50% !important;
`;

const InputValue = styled.input<IInputValue>`
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

  ${props => props.borderFull && css`
    border-radius: 15px !important;
  `}
`;

const Button = styled.div`
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

const Input = ({icon, handleChange, handleClick, value, onKeyPress}: IInputComponent) => {
    const inputRef = useRef<any>()

    const send = () => {
        if (handleClick) {
            handleClick()
        }
        inputRef.current.focus()
    }

    return (
        <Wrap onKeyPress={onKeyPress}>
            <InputInnerWrap>
                {value !== undefined
                    ? <InputValue borderFull={!icon} onChange={handleChange} value={value} ref={inputRef}/>
                    : <InputValue borderFull={!icon} onChange={handleChange} ref={inputRef}/>
                }
                {icon && (
                    <Button>
                        <Icon
                            className="material-icons"
                            onClick={send}
                        >
                            {icon}
                        </Icon>
                    </Button>
                )}
            </InputInnerWrap>
        </Wrap>
    )
}

export default Input