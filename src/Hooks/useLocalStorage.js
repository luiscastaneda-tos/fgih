import { useState } from 'react';

export function useLocalStorage() {
  const key = 'thread_id';
  const storedValue = localStorage.getItem(key);

  const [thread_local, setThread_local] = useState(storedValue ? JSON.parse(storedValue) : null);

  const saveToLocalStorage = (newValue) => {
    setThread_local(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  const removeFromLocalStorage = () => {
    setThread_local(null);
    localStorage.removeItem(key);
  };

  return {
    thread_local,
    save: saveToLocalStorage,
    remove: removeFromLocalStorage,
  };
}
export function useLocalStorageList() {
  const key = 'thread_id';
  const keyList = 'threads';
  const storedValue = localStorage.getItem(key);
  const liststored = localStorage.getItem(keyList);

  const [thread_local, setThread_local] = useState(storedValue ? JSON.parse(storedValue) : null);
  const [threads, setThreads] = useState(liststored ? JSON.parse(liststored) : []);

  const saveToLocalStorage = (newValue) => {
    let isExists = false;

    threads.forEach((element) => {
      if (element.id == newValue) isExists = true;
    });

    setThread_local(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
    if (!isExists) {
      setThreads([{ id: newValue, name: getTimeFormat() }, ...threads]);
      localStorage.setItem(keyList, JSON.stringify([{ id: newValue, name: getTimeFormat() }, ...threads]));
    }
  };

  const removeFromLocalStorage = () => {
    console.log(threads)
    setThread_local(null);
    localStorage.removeItem(key);
  };

  return {
    thread_local,
    threads,
    save: saveToLocalStorage,
    remove: removeFromLocalStorage,
  };
}

function getTimeFormat() {
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1;
  const dia = fechaActual.getDate();
  const hora = fechaActual.getHours();
  const minutos = fechaActual.getMinutes();

  return `${año}/${mes}/${dia} - ${hora}:${minutos}`;
}