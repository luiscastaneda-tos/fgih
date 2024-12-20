/* eslint-disable react-hooks/exhaustive-deps */
import { LoadMessage } from "../LoadMessage/LoadMessage.jsx";
import { IconSearch } from "../../assets/icons/icons.jsx";
import { Message } from "../Message/Message.jsx";
import { UserInput } from "../UserInput/UserInput.jsx";
import { useLocalStorage } from "../../Hooks/useLocalStorage.js";
import { useState, useEffect, useRef } from 'react'
import './Main.css'

export function Main() {
    const divRef = useRef(null);
    const [assistant, ] = useState("asst_QwPVn8JiHf2ZnYppN6v60Cb9");
    const [messages, setMessages] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [inMessage, setInMessage] = useState(false)
    const { remove, save, thread_local } = useLocalStorage()

    async function handleCopiar() {
        try {
            await navigator.clipboard.writeText(thread_local);
        } catch (err) {
            alert('Error al copiar: ', err);
        }
    }

    function handleSubmitThread(e) {
        e.preventDefault();
        if (inputValue != "") fetchListMessages(inputValue)
    }

    const handleSubmitMessage = (message) => {
        setMessages([...messages, {
            role: "user",
            content: message
        }])
    }

    const scrollToBottom = () => {
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }
    };

    const handleNewChat = () => {
        remove()
        setMessages([])
    }

    useEffect(() => {
        if (thread_local && messages.length == 0) {
            fetchListMessages(thread_local)
        }
    }, [thread_local])

    async function fetchListMessages(value) {
        await fetch("https://noktos-chatbot.uc.r.appspot.com/chat?thread_id=" + value)
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
            });
    }
    async function connectOpenAI() {
        await fetch("https://noktos-chatbot.uc.r.appspot.com/chat", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                thread_id: thread_local,
                content: messages[messages.length - 1].content,
                assistantID : assistant
            }),
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                setMessages([...messages, {
                    role: "assistant",
                    content: data.response.message.content[0].text.value
                }])
                if (!thread_local) {
                    save(data.response.thread_id)
                }
            })
            .catch((error) => {
                setInMessage(false)
                console.error('Error:', error);
                alert("ha ocurrido un error, verifica la consola")
            });
    }

    useEffect(() => {
        //En la construccion del componente termina el useeffect
        if (messages.length == 0) return

        //Cuando el ultimo mensaje es del bot habilita el envio de mensajes
        if (messages[messages.length - 1].role == "assistant") {
            setInMessage(false)
        }

        //Cuando el ultimo mensaje es del cliente deshabilita el envio de mensajes y carga la respuesta del bot
        if (messages[messages.length - 1].role == "user") {
            setInMessage(true)
            connectOpenAI()
        }

        //Cuando termina de habilitar/deshabilitar el envio de mensaje y obtener el mensaje del bot scrollea donde se encuentran los mensajes hasta el fondo
        scrollToBottom()

        console.log(messages)

    }, [messages])

    return (
        <main>
            <nav>
                <img className="logo_main" src="https://www.app.noktos.com/img/noktos_logo.svg" alt="" />

                {
                    !thread_local &&
                    <form className="getThread" onSubmit={handleSubmitThread} >
                        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ingresa el thread_id" />
                        <button type="submit">
                            <IconSearch />
                        </button>
                    </form>
                }

                {
                    thread_local && <button onClick={handleNewChat} >Crear nuevo chat</button>
                }

            </nav>
            <section className="chat">
                <section ref={divRef} className="messages">

                    {
                        messages.map((element) => {
                            return <Message
                                key={Math.random() * 9999999}
                                message={element.content}
                                isUser={element.role == "user"}
                            />
                        })
                    }

                    {
                        inMessage && <LoadMessage handleShow={scrollToBottom} />
                    }

                </section>

                {
                    thread_local &&
                    <div className="container__thread" onClick={handleCopiar} tabIndex={0}>
                        <p>Thread ID: {thread_local}</p>
                    </div>
                }

                <UserInput
                    onSubmit={handleSubmitMessage}
                    isDisabled={inMessage}
                    isInitParent={!!thread_local}
                />

            </section>
        </main>
    )
}