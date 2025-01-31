import { threadContext, messageContext } from "../Context/contextsTypes.js";
import { InputSend } from "./InputSend.jsx";
import { useContext } from "react";

export function UserInput() {
   const { thread } = useContext(threadContext)
   const { addMessage, loading } = useContext(messageContext)

   const handleSubmit = (value) => {
      if (loading) return
      if (!value) return
      addMessage(value)
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
         <InputSend
            onSubmit={handleSubmit}
            placeholder={"Chat, hazme la cotización..."}
            large={true}
         />
      </div>
   )
}

