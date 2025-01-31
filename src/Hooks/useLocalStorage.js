import { useState } from 'react';

export function useLocalStorage() {
  const liststored = localStorage.getItem(keyList);
  const [threads, setThreads] = useState(liststored ? JSON.parse(liststored) : []);

  const saveToLocalStorage = (newValue) => {
    let list = localStorage.getItem(keyList);
    let updatedThreads = (list ? JSON.parse(list) : []);
    for (const element of updatedThreads) {
      if (element.id == newValue) return;
    }
    setThreads([{ id: newValue, name: getTimeFormat() }, ...updatedThreads]);
    localStorage.setItem(keyList, JSON.stringify([{ id: newValue, name: getTimeFormat() }, ...updatedThreads]));
  };

  const removeToLocalStorage = () => {
    setThreads([]);
    localStorage.removeItem(keyList);
  }

  return {
    threads,
    save: saveToLocalStorage,
    remove: removeToLocalStorage
  };
}

const keyList = 'threads';

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