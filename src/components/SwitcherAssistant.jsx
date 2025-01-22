/* eslint-disable react/prop-types */
import { styled } from "styled-components";

export function SwitcherAssistant({ assistant, setAssistant }) {

  return (
    <SwitcherAssistantStyled>

      {
        assistants.map(({ id, name }) => {
          let selected = false
          if (assistant.id == id) selected = true
          return (<ButtonSwitcherStyled selected={selected} onClick={() => { setAssistant({ id, name }) }} key={id}  >
            {name}
          </ButtonSwitcherStyled>)
        })
      }

    </SwitcherAssistantStyled>
  )
}

const SwitcherAssistantStyled = styled.aside`
width: 100%;
display: grid;
border-radius: 3px;
grid-template-columns: 1fr;
background-color: #d9d6fe;
padding: 5px;
gap: 5px;
`
const ButtonSwitcherStyled = styled.button`
width: 100%;
min-width: fit-content;
height: 35px;
background-color: ${props => props.selected ? "var(--blue-950)" : "transparent"};
border: none;
color: ${props => props.selected ? "var(--blue-50)" : "var(--blue-950)"};
border-radius: 3px;
cursor: pointer;
position: relative;
transition: background-color .2s ease-out;

&::after{
  content: "";
  width: 90%;
  height: 1px;
  border-radius: 50%;
  background-color: #00000046;
  position: absolute;
  right: 50%;
  bottom: -3px;
  transform: translateX(50%);
}

&:last-child::after{
  content: "";
  width: 0;
}

&:hover{
  background-color: ${props => props.selected ? "var(--blue-950)" : "var(--blue-50)"};
}
`

let assistants = [
  {
    id: "asst_bzwg7fR39wMhTewlkd10Su4K",
    name: "Reportes",
    selected: false
  },
  {
    id: "asst_QwPVn8JiHf2ZnYppN6v60Cb9",
    name: "Cotización",
    selected: false
  },
  {
    id: "asst_zJZp1OrUaQEYD3DcXjBI6Q5O",
    name: "Vuelo",
    selected: false
  }
]