import { styled } from "styled-components";
import { useState } from "react";
import "./Prueba.css"

export function Prueba() {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("enviando formulario")
  }
  return (
    <FormStyled onSubmit={handleSubmit}>

      <InputContainer>
        <LabelStyled>
          Ingresa un número
        </LabelStyled>
        <InputStyled
          type="number"
          min={0}
          value={value}
          onChange={(e) => { setValue(e.target.value) }}
          placeholder=" " />
      </InputContainer>

      <ButtonStyled type="submit">Calcular</ButtonStyled>

    </FormStyled>
  )
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;`

const InputContainer = styled.div`
  position: relative;
  height: fit-content;`

const LabelStyled = styled.label`
  position: absolute;
  color: #888;
  top: -8px;
  transform: translateY(20px);
  left: 10px;
  background-color: var(--white);
  z-index: -1;
  transition: all 0.3s;
  
  &:has(+ input:focus),
  &:has(+ input:not(:placeholder-shown)) {
    color: var(--blue-950);
    transform: translateY(0);
    font-size: 0.8rem;
    z-index: 1;
  }`

const InputStyled = styled.input`
width: 100vw;
max-width: 400px;
height: 50px;
border: 1px solid var(--blue-400);
border-radius: 5px;
background-color: transparent;
padding: 0 10px;
font-size: 1rem;
box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.459);

&:focus,
&:not(:placeholder-shown) {
  outline: none;
  border: 2px solid var(--blue-500);
}`

const ButtonStyled = styled.button`
background-color: var(--blue-500);
color: var(--white);
border: none;
border-radius: 8px;
width: 100%;
max-width: 400px;
padding: 10px;
font-size: 1rem;
cursor: pointer;
transition: background-color 0.2s, box-shadow .3s;
box-shadow: 0 2px 2px rgba(0, 0, 0, 0.459);

&:hover {
  background-color: var(--blue-600);
  box-shadow: none;
}

&:active {
  background-color: var(--blue-700);
}`