/* eslint-disable react/prop-types */
import { useState } from "react";
import { IconSearch } from "../../assets/icons/icons.jsx";

export const ManagerChat = ({ thread, fetchListMessages, handleClick }) => {
    const [value, setValue] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
        if (value != "") fetchListMessages(value)
    }
    return (
        <>
            {
                !thread &&
                <form className="getThread" onSubmit={handleSubmit} >
                    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Ingresa el thread_id" />
                    <button type="submit">
                        <IconSearch />
                    </button>
                </form>
            }

            {
                thread && <button onClick={handleClick} >Crear nuevo chat</button>
            }
        </>
    )
}