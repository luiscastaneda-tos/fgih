import { useState } from "react";
import { styled } from "styled-components";
import { ArrowIcon } from "../assets/icons/icons.jsx";
import { OptionsThreads } from "../Containers/OptionsThread.jsx";

export function DashBoard() {
   const [open, setOpen] = useState(false)

   return (
      <DashboardContainerStyled>
         <SideBarStyled $isopen={open} >
            <ButtonIconStyled $isopen={open} onClick={() => setOpen(!open)}>
               <ArrowIcon />
            </ButtonIconStyled>
            <OptionsThreads />
         </SideBarStyled>
         <MainStyled>
         </MainStyled>
      </DashboardContainerStyled>
   )
}

const DashboardContainerStyled = styled.main`
   width: 100vw;
   display: grid;
   grid-template-columns: auto 1fr;
`

const MainStyled = styled.main`
   width: 100%;
   height: 100%;
   background-color: blue;
`

const SideBarStyled = styled.aside`
   background-color: var(--blue-950);
   width: ${props => props.$isopen ? "250px" : "60px"};
   height: 100dvh;
   transition: width 0.4s ease;
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 10px;
   padding: 8px;
   justify-content: start;
`

const ButtonIconStyled = styled.button`
   width: 60px;
   transform: ${props => props.$isopen ? "rotate(180deg)" : "rotate(0deg)"};
   transition: transform .2s ease;
   border: none;
   outline: none;
   background-color: transparent;
   color: aliceblue;
   cursor: pointer;
   margin-top: 5px;
   align-self: flex-end;
`