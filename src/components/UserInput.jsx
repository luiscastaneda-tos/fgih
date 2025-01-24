/* eslint-disable react/prop-types */
import { SendIcon } from "../assets/icons/icons.jsx";
import { FormStyled, InputStyled, IconStyled } from "./Utilities.jsx";
import { useState } from "react";

export function UserInput({ onSubmit, isInMessage, thread }) {
  const [valueInput, setValueInput] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isInMessage) return
    if (valueInput == "") return

    onSubmit(valueInput)
    setValueInput("")
  }

  async function handleCopiar() {
    try {
      await navigator.clipboard.writeText(thread);
    } catch (err) {
      alert('Error al copiar: ', err);
    }
  }

  return (
    <div>
      {
        thread &&
        <div className="container__thread" onClick={handleCopiar} tabIndex={0}>
          <p>Thread ID: {thread}</p>
        </div>
      }
      <FormStyled large onSubmit={handleSubmit} >
        <InputStyled
          value={valueInput}
          onChange={(e) => { setValueInput(e.target.value) }}
          placeholder="Hola chat, necesito tu ayuda..." />
        <IconStyled type="submit">
          <SendIcon />
        </IconStyled>
      </FormStyled>
    </div>
  )
}

