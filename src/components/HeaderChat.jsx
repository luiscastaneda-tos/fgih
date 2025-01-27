/* eslint-disable react/prop-types */
import { ContainerNav } from "../Containers/ContainerNav.jsx";
import { IconMenu, Logo } from "../assets/icons/icons.jsx";
import { styled } from "styled-components";
import { Drawer } from "./Drawer.jsx";
import { useState } from "react";

export const HeaderChat = ({ thread, fetchListMessages, remove, setMessages, assistant, setAssistant, listThreads = [], removeList }) => {
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleClick = () => {
    remove()
    setMessages([])
  }

  return (
    <NavStyled>

      <Logo />
      {assistant &&
        <SpanStyled onClick={() => { setOpenDrawer(true) }} >{assistant.name}</SpanStyled>
      }
      <IconMenu onClick={() => { setOpenDrawer(true) }} ></IconMenu>


      {openDrawer &&
        <Drawer onClose={setOpenDrawer}>
          <ContainerNav
            removeList={removeList}
            assistant={assistant}
            setAssistant={setAssistant}
            thread={thread}
            fetchListMessages={fetchListMessages}
            handleClick={handleClick}
            listThreads={listThreads}
          />
        </Drawer>
      }

    </NavStyled>
  )
}

const NavStyled = styled.nav`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`
const SpanStyled = styled.span`
  font-size: 12px;
  color: var(--blue-50);
  font-weight: 500;
  text-transform: uppercase;
  background-color: var(--blue-950);
  padding: 5px 10px;
  border-radius: 10px;
  position: absolute;
  right: 45px;
  cursor: pointer;
`