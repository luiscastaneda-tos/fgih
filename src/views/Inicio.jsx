/* eslint-disable react-hooks/exhaustive-deps */
import { ContainerChat } from "../Containers/ContainerChat.jsx";
import { HeaderChat } from "../components/HeaderChat.jsx";
import { useLocalStorageList } from "../Hooks/useLocalStorage.js";
import { useState, useEffect } from 'react'
import { styled } from "styled-components";

const URL = "http://localhost:3000/chat"

export function Inicio() {
  const { remove, save, thread_local, threads = [] } = useLocalStorageList();
  const [messages, setMessages] = useState([])
  const [assistant, setAssistant] = useState({
    id: "asst_QwPVn8JiHf2ZnYppN6v60Cb9",
    name: "Cotización"
  });

  async function fetchListMessages(value) {
    if (!value) return
    await fetch(`${URL}?thread_id=` + value)
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data.error) throw new Error(data)
        setMessages(data)
        save(value)
      })
      .catch((error) => {
        remove()
        console.error('Error:', error);
        alert("ha ocurrido un error, verifica la consola")
      });
  }

  async function connectOpenAI() {
    try {
      const bodyObj = {
        thread_id: thread_local,
        content: messages[messages.length - 1].content,
        assistantID: assistant.id
      }

      const res = await fetch(`${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyObj),
      })
      const data = await res.json()

      setMessages([...messages, { role: "assistant", content: data.response.message.content[0].text.value }])
      if (!thread_local) save(data.response.thread_id)

    } catch (error) {
      console.error('Error:', error);
      alert("ha ocurrido un error, verifica la consola")
      setMessages([...messages, { role: "error", content: "Lo siento, ha ocurrido un error" }])
    }
  }

  useEffect(() => {
    if (messages.length == 0) return
    if (messages[messages.length - 1].role == "user") {
      connectOpenAI()
    }
    console.log(messages)
  }, [messages])

  useEffect(() => {
    if (thread_local != "" && messages.length == 0) {
      fetchListMessages(thread_local)
    }
  }, [thread_local])

  return (
    <MainStyled>
      <HeaderChat
        thread={thread_local}
        remove={remove}
        setMessages={setMessages}
        fetchListMessages={fetchListMessages}
        assistant={assistant}
        listThreads={threads}
        setAssistant={setAssistant}
      />
      <ContainerChat
        messages={messages}
        thread={thread_local}
        setMessages={setMessages}
      />
    </MainStyled>
  )
}

const MainStyled = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  padding: 0 10px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  overflow: hidden;
`