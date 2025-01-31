/* eslint-disable react/prop-types */
import { messageContext } from "./contextsTypes.js";
import { useChat } from "../Hooks/useChat.js";

export function MessageContextProvider({ children }) {
  const { messages, setMessages, addMessage, loading } = useChat()

  return (
    <messageContext.Provider value={{ messages, setMessages, addMessage, loading }}>
      {children}
    </messageContext.Provider>
  )
}