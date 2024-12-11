import { useState } from 'react';

// Hook para gestionar localStorage con una clave fija
export function useLocalStorage() {
    const KEY = 'thread_id';  // Clave fija para el localStorage

    // Recuperamos el valor desde localStorage al montar el componente
    const storedValue = localStorage.getItem(KEY);

    // Estado para manejar el valor
    const [thread_local, setThread_local] = useState(storedValue ? JSON.parse(storedValue) : null);

    // Función para guardar un valor en localStorage y actualizar el estado
    const saveToLocalStorage = (newValue) => {
        setThread_local(newValue); // Actualiza el estado
        localStorage.setItem(KEY, JSON.stringify(newValue)); // Guarda en localStorage
    };

    // Función para eliminar el valor del localStorage y actualizar el estado
    const removeFromLocalStorage = () => {
        setThread_local(null); // Actualiza el estado
        localStorage.removeItem(KEY); // Elimina del localStorage
    };

    return {
        thread_local,             // El valor actual del localStorage
        save: saveToLocalStorage,  // Función para guardar el valor
        remove: removeFromLocalStorage, // Función para eliminar el valor
    };
}

// Hook para gestionar localStorage con una lista de valores y un índice
export function useLocalStorageList() {
    const KEY = 'thread_id';  // Clave fija para el localStorage
    const INDEX_KEY = 'thread_index';  // Clave para el índice del último valor agregado

    // Recuperamos el valor desde localStorage al montar el componente
    const storedValues = localStorage.getItem(KEY);
    const storedIndex = localStorage.getItem(INDEX_KEY);

    // Si no hay valores en localStorage, inicializamos un array vacío y el índice en 0
    const initialValues = storedValues ? JSON.parse(storedValues) : [];
    const initialIndex = storedIndex ? parseInt(storedIndex, 10) : -1;

    // Estado para manejar los valores y el índice
    const [thread_local, setThread_local] = useState(initialValues);
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    // Función para guardar un nuevo valor en la lista y actualizar el índice
    const saveToLocalStorage = (newValue) => {
        const updatedList = [...thread_local, newValue];  // Agregar el nuevo valor al final de la lista
        const newIndex = updatedList.length - 1;  // El índice del nuevo valor es el último

        setThread_local(updatedList);  // Actualiza el estado de los valores
        setCurrentIndex(newIndex);     // Actualiza el índice

        // Guarda la lista de valores y el índice en localStorage
        localStorage.setItem(KEY, JSON.stringify(updatedList));
        localStorage.setItem(INDEX_KEY, newIndex.toString());
    };

    // Función para obtener el valor por su índice
    const getFromLocalStorage = (index) => {
        return thread_local[index] || null;  // Si el índice es inválido, retorna null
    };

    // Función para actualizar un valor en la lista del localStorage por su índice
    const updateInLocalStorage = (index, newValue) => {
        const updatedList = [...thread_local];
        updatedList[index] = newValue;  // Actualiza el valor en el índice indicado

        setThread_local(updatedList);  // Actualiza el estado
        // No cambiamos el índice, ya que no es un nuevo valor
        localStorage.setItem(KEY, JSON.stringify(updatedList));  // Guarda la lista actualizada en localStorage
    };

    // Función para eliminar un valor de la lista en localStorage por su índice
    const removeFromLocalStorage = (index) => {
        const updatedList = thread_local.filter((_, i) => i !== index);  // Elimina el valor en el índice indicado
        const newIndex = updatedList.length - 1;  // El índice del último valor de la lista actualizada

        setThread_local(updatedList);  // Actualiza el estado
        setCurrentIndex(newIndex);     // Actualiza el índice

        // Guarda la lista actualizada y el índice en localStorage
        localStorage.setItem(KEY, JSON.stringify(updatedList));
        localStorage.setItem(INDEX_KEY, newIndex.toString());
    };

    return {
        thread_local,       // La lista actual de valores en localStorage
        currentIndex,       // El índice del último valor agregado
        save: saveToLocalStorage,    // Función para guardar un valor
        get: getFromLocalStorage,    // Función para obtener un valor por índice
        update: updateInLocalStorage, // Función para actualizar un valor en la lista por índice
        remove: removeFromLocalStorage, // Función para eliminar un valor por índice
    };
}