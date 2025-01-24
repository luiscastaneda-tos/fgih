/* eslint-disable react/prop-types */
import { UserInput } from "../components/UserInput.jsx";
import { Chat } from "../components/Chat.jsx";
import { styled } from "styled-components";
import { useEffect, useState } from "react";

export const ContainerChat = ({ messages, thread, setMessages }) => {
  const [inMessage, setInMessage] = useState((messages.length > 0) && (messages[messages.length - 1].role == "user"))


  const handleSubmit = (message) => {
    setMessages([...messages, {
      role: "user",
      content: message
    }])
  }

  useEffect(() => {
    setInMessage((messages.length > 0) && (messages[messages.length - 1].role == "user"))
  }, [messages])

  return (
    <StyledContainerChat>

      <Chat
        messages={messages}
        inMessage={inMessage}
      />

      <UserInput
        onSubmit={handleSubmit}
        isInMessage={inMessage}
        thread={thread}
      />

    </StyledContainerChat>
  )
}

const StyledContainerChat = styled.section`
  width: 100%;
  height: calc(100svh - 60px);
  max-width: 900px;
  padding-bottom: 10px;
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 5px;`