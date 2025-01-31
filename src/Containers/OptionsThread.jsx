import { Button } from "../components/Utilities.jsx";
import { messageContext, threadContext } from "../Context/contextsTypes.js";
import { useContext } from "react";
import { InputSend } from "../components/InputSend.jsx";
import { SwitcherThread } from "../components/SwitcherThread.jsx";

export function OptionsThreads() {
   const { removeThread, clearList, getMessages, threads, thread } = useContext(threadContext)
   const { setMessages } = useContext(messageContext)

   const handleClick = () => {
      setMessages([])
      removeThread()
   }

   const handleSubmit = (value) => {
      getMessages(value)
   }

   const handleDeleteHistorial = () => {
      clearList()
   }

   return (
      <>
         {
            !thread
               ?
               <InputSend
                  onSubmit={handleSubmit}
                  placeholder={"thread-87gfrebhc..."}
               />
               :
               <Button
                  $isalone={true}
                  onClick={handleClick} >Crear nuevo chat</Button>
         }

         <SwitcherThread
            onSubmit={handleSubmit}
            onDelete={handleDeleteHistorial}
            threads={threads}
         />
      </>
   )
}