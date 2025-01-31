import { SwitcherAssistant } from "../components/SwitcherAssistant.jsx";
import { OptionsThreads } from "./OptionsThread.jsx";
import { styled } from "styled-components";

export function Menu() {

   return (
      <>
         <TitleStyled>Chat</TitleStyled>
         <SwitcherAssistant />
         <HrStyled />
         <TitleStyled>Thread</TitleStyled>
         <OptionsThreads />
      </>
   )
}

const HrStyled = styled.hr`
      border: 0;
      width: 100%;
      border-top: 1px solid #33333368;
      margin: 10px 0;
      `

const TitleStyled = styled.h1`
      font-size: 1.5rem;
      color: #333;
      font-weight: 600;
      `