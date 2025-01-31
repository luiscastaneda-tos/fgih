import { Message } from "./Message/Message.jsx";
import { LoadMessage } from "./LoadMessage/LoadMessage.jsx";
import { useEffect, useRef, useContext } from "react";
import { messageContext } from "../Context/contextsTypes.js";
import { styled } from "styled-components";

export const Chat = () => {
  const { messages, loading } = useContext(messageContext);
  const divRef = useRef(null);

  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <SectionMessagesStyled ref={divRef}>

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
        loading && <LoadMessage handleShow={scrollToBottom} />
      }

    </SectionMessagesStyled>
  )
}

const SectionMessagesStyled = styled.section`
  display: flex;
  max-height: 100%;
  overflow: auto;
  padding: 10px;
  flex-direction: column;
  justify-content: start;
  background-color: var(--blue-50);
  border: 1px solid var(--blue-200);
  box-shadow: 0 0 10px var(--blue-200);
  border-radius: 10px;
  align-items: center;
  
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--blue-100);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--blue-900);
    border-radius: 10px;
  }`