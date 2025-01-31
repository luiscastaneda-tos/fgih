/* eslint-disable react/prop-types */
import { useState } from "react";
import { assistantContext } from "./contextsTypes.js";

export function AssistantContextProvider({ children }) {
  const [assistant, setAssistant] = useState(initialStateAssistant)

  return (
    <assistantContext.Provider value={{ assistant, setAssistant }}>
      {children}
    </assistantContext.Provider>
  )
}

const initialStateAssistant = {
  id: "asst_QwPVn8JiHf2ZnYppN6v60Cb9",
  name: "Cotización"
}