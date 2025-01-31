import { AssistantContextProvider } from "./assistant.jsx";
import { MessageContextProvider } from "./message.jsx";
import { ThreadContextProvider } from "./thread.jsx";

// eslint-disable-next-line react/prop-types
export function ContextProviderChat({ children }) {
  return (
    <AssistantContextProvider>
      <ThreadContextProvider>
        <MessageContextProvider>
          {children}
        </MessageContextProvider>
      </ThreadContextProvider>
    </AssistantContextProvider>
  )
}