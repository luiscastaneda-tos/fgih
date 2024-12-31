/* eslint-disable react-hooks/exhaustive-deps */
import { ContainerChat } from "../ContainerChat/ContainerChat.jsx";
import { useLocalStorage } from "../../Hooks/useLocalStorage.js";
import { HeaderChat } from "../HeaderChat/HeaderChat.jsx";
import { useState, useEffect } from 'react'
import './Main.css'

const URL = "https://noktos-chatbot.uc.r.appspot.com/chat"
let assistants = [
    {
        id: "asst_bzwg7fR39wMhTewlkd10Su4K",
        name: "Reportes"
    },
    {
        id: "asst_QwPVn8JiHf2ZnYppN6v60Cb9",
        name: "Cupon cotización"
    }
]

export function Main() {
    const [assistant,] = useState(assistants[0].id);
    const [messages, setMessages] = useState([])
    const [inMessage, setInMessage] = useState(false)
    const { remove, save, thread_local } = useLocalStorage()

    async function fetchListMessages(value) {
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
            const res = await fetch(`${URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    thread_id: thread_local,
                    content: messages[messages.length - 1].content,
                    assistantID: assistant
                }),
            })
            const data = await res.json()

            console.log(data)
            setMessages([...messages, { role: "assistant", content: data.response.message.content[0].text.value }])
            if (!thread_local) save(data.response.thread_id)

        } catch (error) {
            setInMessage(false)
            console.error('Error:', error);
            alert("ha ocurrido un error, verifica la consola")
        }
    }

    useEffect(() => {
        if (messages.length == 0) return
        if (messages[messages.length - 1].role == "assistant") {
            setInMessage(false)
        }
        if (messages[messages.length - 1].role == "user") {
            setInMessage(true)
            connectOpenAI()
        }
        console.log(messages)
    }, [messages])

    useEffect(() => {
        if (thread_local && messages.length == 0) {
            fetchListMessages(thread_local)
        }
    }, [thread_local])

    return (
        <main>
            <HeaderChat
                thread={thread_local}
                remove={remove}
                setMessages={setMessages}
                fetchListMessages={fetchListMessages}
            />
            <ContainerChat
                messages={messages}
                inMessage={inMessage}
                thread={thread_local}
                setMessages={setMessages}
            />
        </main>
    )
}