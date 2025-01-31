/* eslint-disable react/prop-types */
import { styled } from "styled-components";
import { SendIcon } from "../assets/icons/icons.jsx";
import { useState } from "react";

export function InputSend({ onSubmit, placeholder, large = false }) {
   const [value, setValue] = useState("")

   const handleSubmit = (e) => {
      e.preventDefault()
      onSubmit(value)
      setValue("")
   }

   const handleChange = (e) => {
      setValue(e.target.value)
   }

   return (
      <FormStyled
         $islarge={large}
         onSubmit={handleSubmit} >
         <InputStyled
            value={value}
            onChange={handleChange}
            placeholder={placeholder} />
         <IconStyled type="submit">
            <SendIcon />
         </IconStyled>
      </FormStyled>
   )
}


const FormStyled = styled.form`
  border: 2px solid var(--blue-300);
  background-color: var(--blue-50);
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px 0 0;
  align-items: center;
  max-width: 900px;
  width: 100%;
  height: ${props => props.$islarge ? "70px" : "50px"};
  `

const InputStyled = styled.input`
  height: 100%;
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: .95rem;
  padding: 8px 0 8px 14px;`

const IconStyled = styled.button`
  height: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
  `