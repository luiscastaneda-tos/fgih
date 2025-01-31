import { assistantContext } from "../Context/contextsTypes.js";
import { UserInput } from "../components/UserInput.jsx";
import { Header } from "../Containers/Header.jsx";
import { Chat } from "../components/Chat.jsx";
import { styled } from "styled-components";
import { useContext } from "react";

export function Inicio() {
   const { assistant } = useContext(assistantContext)

   return (
      <MainStyled>
         <Header assistant={assistant} />
         <StyledContainerChat>
            <Chat />
            <UserInput />
         </StyledContainerChat>
      </MainStyled>
   )
}

const MainStyled = styled.main`
  width: 100vw;
  height: 100dvh;
  display: flex;
  padding: 0 10px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  overflow: hidden;
`
const StyledContainerChat = styled.section`
  width: 100%;
  height: calc(100svh - 60px);
  max-width: 900px;
  padding-bottom: 10px;
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 5px;`