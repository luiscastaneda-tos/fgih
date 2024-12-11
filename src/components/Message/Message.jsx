import React from "react";
import { UseComponents } from "../../Hooks/UseComponents.jsx";
import "./Message.css"

// eslint-disable-next-line react/prop-types
export function Message({ message, isUser }) {

    let components = UseComponents(message)

    return (
        <div key={Math.random() * 1234567890} className={isUser ? "user-message" : "message-bot"}>
            {!isUser ?
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="163 -5 195 200" id="logo">
                    <g id="circle">
                        <path className="st0"
                            d="M353.7,93.9c0.2-52-41.9-94.3-93.9-94.5c-52-0.2-94.3,41.9-94.5,93.9s41.9,94.3,93.9,94.5c0.1,0,0.2,0,0.3,0 C311.5,187.9,353.7,145.8,353.7,93.9C353.7,93.9,353.7,93.9,353.7,93.9L353.7,93.9z" />
                    </g>
                    <g id="moon">
                        <path className="st1"
                            d="M218,113c-3.2-6.5-4.8-13.6-4.7-20.9c0.1-15.8,8.1-30.5,21.4-39.2c4.1-2.8,8.8-4.6,13.7-5.3 c0,0-20.8,63.6,52.3,65.7c-7.5,14.9-22.6,24.4-39.2,24.8C243.3,139,226.3,129.2,218,113L218,113z" />
                    </g>
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="#065474" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>
            }
            {components.map((element) => {
                if (Object.keys(element.props).length == 0) {
                    return
                }
                return (
                    <React.Fragment key={Math.random() * 12346789}>
                        {element}
                    </React.Fragment>
                )
            })}
        </div>
    )
}