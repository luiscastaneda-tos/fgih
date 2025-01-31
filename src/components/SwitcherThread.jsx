/* eslint-disable react/prop-types */
import { Button } from "./Utilities.jsx";
import { styled } from "styled-components";
import { useState } from "react"

export function SwitcherThread({ threads = [], onDelete, onSubmit }) {
   const [value, setValue] = useState("")

   const handleSubmit = (e) => {
      e.preventDefault()
      onSubmit(value)
      setValue("")
   }

   const handleChange = (e) => {
      setValue(e.target.value)
   }

   const handleDeleteHistorial = () => {
      onDelete()
   }

   return (
      <FormStyled onSubmit={handleSubmit}>
         <SelectStyled
            onChange={handleChange}
            value={value}>
            <option value="">Selecciona un thread</option>
            {
               threads.map((element, index) => <option key={element.id + index} value={element.id}>{element.name}</option>)
            }
         </SelectStyled>
         <Button
            $isalone
            onClick={handleDeleteHistorial}>Borrar lista</Button>
         <Button
            $isalone
            type="submit"
            $secondaryButton>Buscar thread</Button>

      </FormStyled>
   )
}

const FormStyled = styled.form`
width: 100%;
display: grid;
grid-template-columns: 1fr 1fr;
gap: 10px;
`

const SelectStyled = styled.select`
grid-column: 1/3;
      width: 100%;
      height: 40px;
      padding: 10px;
      border-radius: 5px;
      background-color: var(--blue-100);
      border: 1px solid var(--blue-500);`