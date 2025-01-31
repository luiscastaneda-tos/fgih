import { useLocalStorage } from "../Hooks/useLocalStorage.js";
import { useState, useCallback } from "react";

export function useThread() {
  const { remove, save, threads } = useLocalStorage();
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pendingMessages, setPendingMessages] = useState([])

  const removeThread = () => {
    setThread(null)
  }

  const saveThread = useCallback((thread) => {
    setThread(thread)
    save(thread)
  }, [save])

  const getMessages = useCallback(async (thread) => {
    setLoading(true)
    try {

      const response = await fetch(URL + thread)
      const data = await response.json()

      if (data.error) throw new Error(`${data.message} \n${data.error.status}: ${data.error.type}\n${data.error.error.message}`)

      setPendingMessages(data)
      saveThread(thread)

    } catch (err) {
      removeThread()
      setPendingMessages([])
      alert("ha ocurrido un error, verifica la consola")
      console.error(err)

    } finally {
      setLoading(false)
    }
  }, [saveThread])

  const clearList = () => {
    remove()
  }

  return {
    getMessages,
    thread,
    removeThread,
    clearList,
    loading,
    pendingMessages,
    threads,
    saveThread
  };
}

const URL = "http://localhost:3000/chat?thread_id="