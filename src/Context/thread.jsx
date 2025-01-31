/* eslint-disable react/prop-types */
import { threadContext } from "./contextsTypes.js";
import { useThread } from "../Hooks/useThread.js";

export function ThreadContextProvider({ children }) {
  const { clearList, getMessages, loading, removeThread, thread, pendingMessages, threads, saveThread } = useThread();

  return (
    <threadContext.Provider value={{ clearList, getMessages, loading, removeThread, thread, pendingMessages, threads, saveThread }}>
      {children}
    </threadContext.Provider>
  )
}