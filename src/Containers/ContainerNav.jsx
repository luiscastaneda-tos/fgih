/* eslint-disable react/prop-types */
import { SwitcherAssistant } from "../components/SwitcherAssistant.jsx";
import { Button } from "../components/Utilities.jsx";
import { ManagerChat } from "./ManagerChat.jsx";
import { styled } from "styled-components";
import { Link } from "wouter";

export function ContainerNav(props) {
  const { thread, fetchListMessages, assistant, setAssistant, handleClick, listThreads = [], removeList } = props

  return (
    <ContainerStyled>
      <TitleStyled>Menu de navegación</TitleStyled>
      <UlStyled>
        <LinkStyled href="/">Chat</LinkStyled >
        <LinkStyled href="/upload">Subir archivo</LinkStyled >
      </UlStyled>
      {
        fetchListMessages &&
        <>
          <HrStyled />
          <TitleStyled>Thread</TitleStyled>
          <Button isalone onClick={removeList}>Borrar lista de threads</Button>
          <SelectStyled onChange={(e) => fetchListMessages(e.target.value)}>
            <option value="">Selecciona un thread</option>
            {
              listThreads.map((element, index) => <option key={element.id + index} value={element.id}>{element.name}</option>)
            }
          </SelectStyled>
          <ManagerChat
            thread={thread}
            handleClick={handleClick}
            fetchListMessages={fetchListMessages} />
          <HrStyled />
          <TitleStyled>Chat</TitleStyled>
          <SwitcherAssistant
            assistant={assistant}
            setAssistant={setAssistant} />
        </>
      }

    </ContainerStyled>
  )
}

const LinkStyled = styled(Link)`
text-decoration: none;
padding: 5px;
border-radius: 2px;
width: 100%;
color: #333;
font-size: 1rem;
font-weight: 500;
position: relative;
&::after{
  content: "";
  width: 95%;
  height: 1px;
  border-radius: 50%;
  background-color: #61616146;
  position: absolute;
  right: 50%;
  bottom: -3px;
  transform: translateX(50%);
}

&:last-child::after{
  content: "";
  width: 0;
}
&:hover {
  color: var(--blue-100);
background-color: var(--blue-900);
}
`

const ContainerStyled = styled.div`
      width: 100%;
      display: flex;
      padding: 10px;
      flex-flow: column wrap;
      gap: 10px;
      `

const HrStyled = styled.hr`
      border: 0;
      width: 100%;
      border-top: 1px solid #3333338e;
      `

const TitleStyled = styled.h1`
      font-size: 1.5rem;
      color: #333;
      font-weight: 600;
      `

const UlStyled = styled.ul`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      list-style: none;
      padding: 5px;
      margin: 0;
      background-color: var(--blue-200);
      border-radius: 5px;
      gap: 5px;
      `

const SelectStyled = styled.select`
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      background-color: var(--blue-100);
      border: 1px solid var(--blue-500);`