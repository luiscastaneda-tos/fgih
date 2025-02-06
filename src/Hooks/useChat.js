import { useCallback, useEffect, useState } from "react";
import { useContext } from "react";
import { assistantContext, threadContext } from "../Context/contextsTypes.js";

export function useChat() {
   const [messages, setMessages] = useState([]);
   const [loading, setloading] = useState(false);
   const { assistant } = useContext(assistantContext)
   const { thread, pendingMessages, saveThread } = useContext(threadContext)

   const addMessage = useCallback(async (content) => {
      let messageUser = {
         role: "user",
         content,
      };

      //TODO CAMBIAR A thread y assistant en el backend igual
      const bodyObj = {
         thread_id: thread,
         content,
         assistantID: assistant.id
      }

      setMessages((prevMessages) => [...prevMessages, messageUser]);
      setloading(true)

      try {
         const res = await fetch(URL, { ...PARAMS, body: JSON.stringify(bodyObj) })
         const data = await res.json()

         if (data.error) throw new Error(`${data.message} \n${data.error.status}: ${data.error.type}\n${data.error.error.message}`)

         setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: data.response.message.content[0].text.value }]);
         if (!thread) saveThread(data.response.thread_id)

      } catch (error) {
         console.error(`Error:\n\n${new Date()}\n\n`, error);
         alert("ha ocurrido un error, verifica la consola")

      } finally {
         setloading(false)
      }
   }, [assistant.id, saveThread, thread]);

   useEffect(() => {
      if (pendingMessages.length) setMessages(pendingMessages)
   }, [pendingMessages])

   return { messages, setMessages, addMessage, loading };
}

const URL = "http://chatop.noktos.com/chat"
// const URL = "http://chatop-noktoss-env.eba-pbpppppe.us-east-2.elasticbeanstalk.com/chat"
// const URL = "http://localhost:3000/chat"
const PARAMS = {
   method: 'POST',
   headers: {
      'Content-Type': 'application/json',
   }
}