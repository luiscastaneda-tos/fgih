/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { styled } from "styled-components";

export function Drawer({ children, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [posY, setPosY] = useState(0);

  const handleClose = () => {
    setIsVisible(false)
    const timeout = setTimeout(() => {
      onClose(false)
    }, 500);
    return () => clearTimeout(timeout);
  }

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setPosY(e.clientY);
  }

  const handleMouseUp = () => {
    setIsDragging(false);
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const diff = e.clientY - posY;

    if (diff > 100) {
      handleClose();
      setIsDragging(false);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      }
    }
  }, [isDragging]);


  return (
    <ContainerDrawerStyled
      onClick={handleClose}
      isopen={isVisible ? 1 : 0}
    >

      <DrawerStyled
        isopen={isVisible ? 1 : 0}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
      >

        <HandlerDrawerStyled>
          <SpanHandlerStyled />
        </HandlerDrawerStyled>
        {children}

      </DrawerStyled>
    </ContainerDrawerStyled>
  );
}

const ContainerDrawerStyled = styled.div`
  background-color: #00000075;
  width: 100vw;
  height: 100vh;
  position: fixed;
  inset: 0;
  z-index: 123456789876543;
  opacity: ${props => props.isopen ? "1" : "0"};
  display: block;
  transition: opacity .3s ease-in-out;
`;

const DrawerStyled = styled.div`
  background-color: var(--white);
  box-shadow: 0 0 10px #0000008e;
  width: 98%;
  max-width: 450px;
  height: fit-content;
  max-height: 90vh;
  overflow-y: auto;
  padding: 25px 10px;
  padding-top: 35px;
  border-radius: 16px 16px 0 0;
  position: fixed; 
  right: 0;
  bottom: ${(props) => (props.isopen ? '0' : '-80vh')};
  transform: translateX(-1%);
  z-index: 1234567890;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: bottom 0.3s ease-in-out; 
  user-select: none;
`;

const HandlerDrawerStyled = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  position: absolute;
  background-color: transparent;
  padding: 12px;
  top: 10px;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`

const SpanHandlerStyled = styled.span`
  background-color: var(--gris);
  display: block;
  width: 60px;
  height: 100%;
border-radius: 10px;

`