/* eslint-disable react/prop-types */
import { UserInput } from "../UserInput/UserInput.jsx";
import { ThreadId } from "../ThreadId/ThreadId.jsx";
import { Chat } from "../Chat/Chat.jsx";

export const ContainerChat = ({ messages, inMessage, thread, setMessages }) => {

    const handleSubmit = (message) => {
        setMessages([...messages, {
            role: "user",
            content: message
        }])
    }

    return (
        <section className="chat">

            <Chat messages={messages} inMessage={inMessage} />

            <ThreadId thread={thread} />

            <UserInput
                onSubmit={handleSubmit}
                isDisabled={inMessage}
                isInitParent={!!thread}
            />

        </section>
    )
}