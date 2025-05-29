import { useContext, useState } from "react";
import { ToDoContext } from "../context/ToDoContext";
import { Typography, Button } from "@material-tailwind/react";

const ToDoList = () => {

    const { items, deleteTask, setIsEditing, setTaskToUpdate } = useContext(ToDoContext);
    return (
        <div className="mt-8 w-96 place-self-center flex flex-col gap-2">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="flex w-full justify-between items-center gap-2"
                >
                    <Typography className="w-[80%]" variant="lead">{item.body}</Typography>
                    <div className="flex gap-2">
                        <Button
                            variant="filled"
                            size="sm"
                            className="bg-green-500"
                            type="button"
                            onClick={() => {
                                setIsEditing(true);
                                setTaskToUpdate(item);
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="filled"
                            size="sm"
                            className="bg-red-500"
                            type="button"
                            onClick={() => deleteTask(item.id)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ToDoList;
