/* eslint-disable react/prop-types */
import { FormStyled, InputStyled, IconStyled } from "../components/Utilities.jsx";
import { IconSearch } from "../assets/icons/icons.jsx";
import { Button } from "../components/Utilities.jsx";
import { useState } from "react";

export const ManagerChat = ({ thread, fetchListMessages, handleClick }) => {
  const [value, setValue] = useState("")

  function handleSubmit(e) {
    e.preventDefault();
    if (value != "") fetchListMessages(value)
  }
  return (
    <>

      {
        !thread &&
        <FormStyled onSubmit={handleSubmit} >
          <InputStyled type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Ingresa el thread_id" />
          <IconStyled type="submit">
            <IconSearch />
          </IconStyled>
        </FormStyled>
      }

      {
        thread && <Button isalone={1} onClick={handleClick} >Crear nuevo chat</Button>
      }
    </>
  )
}