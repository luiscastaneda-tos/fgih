import { SendIcon } from "../../assets/icons/icons.jsx";
import { useEffect, useState } from "react";
import "./UserInput.css"

//Extraemos la funcion del componente padre Main, este le manda el valor del input y lo agrega a la lista de mensajes
// eslint-disable-next-line react/prop-types
export function UserInput({ onSubmit, isDisabled, isInitParent = false }) {

    //El estado maneja el valor que tiene el input
    const [valueInput, setValueInput] = useState("")
    const [isInit, setIsInit] = useState(isInitParent)

    useEffect(() => {
        setIsInit(isInitParent)
    }, [isInitParent])

    //Maneja cuando el usuario envia el formulario ya sea por el boton o dando enter
    const handleSubmit = (e) => {
        //Previene que se envie un formulario y se reinicie la pagina
        e.preventDefault()

        //Manejar si va vacio o si se esta mandando mensaje para no dejarlo avanzar
        if (isDisabled) return
        if (valueInput == "") return

        //Regresa el textarea a su tamaño normal ya sea por apretar Enter o apretar el boton
        if (e.target.children[0]) {
            e.target.children[0].style.height = "auto"
        } else {
            e.target.style.height = "auto"
        }
        //manda el valor y lo resetea a vacio
        onSubmit(valueInput)
        setValueInput("")
        setIsInit(true)
    }

    //Maneja cada que el usuario teclea y agrega al estado el valor tecleado
    const handleChange = (e) => {

        //Hace que el textarea pueda crecer, pero que no crezca mas del form
        if (e.target.scrollHeight < 80) {
            e.target.style.height = "auto"
            e.target.style.height = e.target.scrollHeight + "px"
        }

        //Mandamos el valor del textarea para mandar el mensaje
        setValueInput(e.target.value)
    }

    //Maneja cada que aprietan un boton mentras estan en el textArea
    const handleKeyDown = (e) => {
        //Manejamos el evento si aprietan enter y mandamos el evento del textarea
        if (e.key == "Enter") handleSubmit(e.nativeEvent)
    }

    //Colocamos un formulario para manejar el envio y que se pueda enviar por el boton o dando enter
    return (
        <form className={isInit ? "typing" : "typing active"} onSubmit={handleSubmit} >
            {!isInit &&
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    x="0px"
                    y="0px"
                    viewBox="110 -5 300 200"
                    id="logoInit">
                    <g id="circles"> <path
                        className="st0"
                        d="M353.7,93.9c0.2-52-41.9-94.3-93.9-94.5c-52-0.2-94.3,41.9-94.5,93.9s41.9,94.3,93.9,94.5c0.1,0,0.2,0,0.3,0 C311.5,187.9,353.7,145.8,353.7,93.9C353.7,93.9,353.7,93.9,353.7,93.9L353.7,93.9z"
                    /> </g> <g id="moons"> <path
                        className="st1"
                        d="M218,113c-3.2-6.5-4.8-13.6-4.7-20.9c0.1-15.8,8.1-30.5,21.4-39.2c4.1-2.8,8.8-4.6,13.7-5.3 c0,0-20.8,63.6,52.3,65.7c-7.5,14.9-22.6,24.4-39.2,24.8C243.3,139,226.3,129.2,218,113L218,113z" /> </g>
                </svg>}
            <textarea rows={1} value={valueInput} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Hazme un reporte de..." />
            <button type="submit" disabled={isDisabled} >
                <SendIcon />
            </button>
        </form>
    )
}