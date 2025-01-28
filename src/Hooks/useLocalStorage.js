import { useState } from 'react';

export function useLocalStorageList() {
  const keyList = 'threads';
  const liststored = localStorage.getItem(keyList);

  const [threads, setThreads] = useState(liststored ? JSON.parse(liststored) : []);
  const [thread_local, setThread_local] = useState(null);

  const saveToLocalStorage = (newValue) => {
    setThread_local(newValue);
    let list = localStorage.getItem(keyList);
    let updatedThreads = list ? JSON.parse(list) : [];
    let isExists = false;

    updatedThreads.forEach((element) => {
      if (element.id == newValue) isExists = true;
    });

    if (!isExists) {
      setThreads([{ id: newValue, name: getTimeFormat() }, ...updatedThreads]);
      localStorage.setItem(keyList, JSON.stringify([{ id: newValue, name: getTimeFormat() }, ...updatedThreads]));
    }
  };

  const removeFromLocalStorage = () => {
    setThread_local(null);
  };

  return {
    thread_local,
    threads,
    save: saveToLocalStorage,
    remove: removeFromLocalStorage,
    removeList: () => {
      setThreads([]);
      localStorage.removeItem(keyList);
    }
  };
}

function getTimeFormat() {
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1;
  const dia = fechaActual.getDate();
  const hora = fechaActual.getHours();
  const minutos = fechaActual.getMinutes();
  const segundos = fechaActual.getSeconds();

  return `${año}/${mes}/${dia} - ${hora}:${minutos}:${segundos}`;
}