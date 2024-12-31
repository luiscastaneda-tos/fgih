/* eslint-disable react/prop-types */
import { Message } from "../Message/Message.jsx";
import { LoadMessage } from "../LoadMessage/LoadMessage.jsx";
import { useRef } from "react";

export const Chat = ({ messages, inMessage }) => {
    const divRef = useRef(null);

    const scrollToBottom = () => {
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }
    };

    return (
        <section ref={divRef} className="messages">

            {
                messages.map((element) => {
                    return <Message
                        key={Math.random() * 9999999}
                        message={element.content}
                        isUser={element.role == "user"}
                    />
                })
            }

            {
                inMessage && <LoadMessage handleShow={scrollToBottom} />
            }

        </section>
    )
}