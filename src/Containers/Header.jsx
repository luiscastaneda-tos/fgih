/* eslint-disable react/prop-types */
import { Menu } from "./Menu.jsx";
import { IconMenu, Logo } from "../assets/icons/icons.jsx";
import { styled } from "styled-components";
import { Drawer } from "../components/Drawer.jsx";
import { useState } from "react";

export const Header = ({ assistant }) => {
   const [openDrawer, setOpenDrawer] = useState(false)

   return (
      <NavStyled>

         <Logo />

         {assistant &&
            <>

               <SpanStyled onClick={() => { setOpenDrawer(true) }} >{assistant.name}</SpanStyled>
               <IconMenu onClick={() => { setOpenDrawer(true) }} ></IconMenu>

               {openDrawer &&
                  <Drawer onClose={setOpenDrawer}>
                     <Menu />
                  </Drawer>
               }

            </>
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