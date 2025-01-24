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
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`