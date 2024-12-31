import { Link } from "wouter";
import { ManagerChat } from "../ManagerChat/ManagerChat.jsx";

// eslint-disable-next-line react/prop-types
export const HeaderChat = ({ thread, fetchListMessages, remove, setMessages }) => {

    const handleClick = () => {
        remove()
        setMessages([])
    }

    return (
        <nav>
            <Link href="/nav" >
                <img className="logo_main" src="https://www.app.noktos.com/img/noktos_logo.svg" alt="" />
            </Link>

            <ManagerChat
                thread={thread}
                handleClick={handleClick}
                fetchListMessages={fetchListMessages}
            />
        </nav>
    )
}