import { createContext, useState } from "react";

export const ToDoContext = createContext();

const ToDoProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    const [isEditing, setIsEditing] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null); // { id, body }


    const addTask = (text) => {
        setItems([...items, { id: Date.now(), body: text }]);
    };

    const deleteTask = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const updateTask = (newText, id) => {
        setItems(
            items.map((item) => (item.id === id ? { ...item, body: newText } : item))
            // items.map((item) => (item.id === id ? { ...item, body: newText } : body))
        );
    };

    return (
        <ToDoContext.Provider value={{ items, addTask, deleteTask, updateTask, isEditing, setIsEditing, taskToUpdate, setTaskToUpdate }}>
            {children}
        </ToDoContext.Provider>
    );
};

export default ToDoProvider;
