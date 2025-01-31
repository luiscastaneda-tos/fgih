import { styled } from "styled-components";

export const Button = styled.button`
  width: ${props => props.$isalone ? "100%" : "15ch"};
  max-width: 450px;
  border: ${props => props.$secondaryButton ? "1px solid var(--blue-700)" : "1px solid transparent"};
  border-radius: 4px;
  background-color: ${props => props.$secondaryButton ? "transparent" : "var(--blue-950)"};
  color: ${props => props.$secondaryButton ? "var(--blue-700)" : "var(--blue-50)"};
  padding: 10px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 2px 4px #0000006e;
  transition: background-color 0.25s, color .25s, border-color .25s;

  &:hover{
    ${props => !props.$secondaryButton && "background-color: var(--blue-800);"}
    ${props => props.$secondaryButton && "color: var(--blue-900);"}
    ${props => props.$secondaryButton && "border-color: var(--blue-900);"}
  }
  
  &:active{
    ${props => !props.$secondaryButton && "background-color: var(--bslue-700);"}
    ${props => props.$secondaryButton && "color: var(--blue-950);"}
    ${props => props.$secondaryButton && "border-color: var(--blue-950);"}
  }
`
