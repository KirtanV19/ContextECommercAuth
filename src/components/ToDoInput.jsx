import { useState, useContext, useEffect } from "react";
import { Card, CardBody, Input, Button } from "@material-tailwind/react";
import { ToDoContext } from "../context/ToDoContext";

const ToDoInput = () => {
    const [task, setTask] = useState("");

    const { addTask, isEditing, setIsEditing, updateTask, taskToUpdate } =
        useContext(ToDoContext);

    useEffect(() => {
        if (taskToUpdate) setTask(taskToUpdate.body);
    }, [taskToUpdate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            updateTask(task, task.id);
            setIsEditing(false);
        } else {
            addTask(task);
        }
        setTask("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className="w-96 place-self-center">
                <CardBody className="flex gap-4">
                    <Input
                        name="task"
                        placeholder="Task"
                        size="lg"
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="appearance-none ring-0  !border-blue-gray-100 text-sm placeholder:text-blue-gray-300 placeholder:opacity-100 focus:border-[1px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        required
                    />
                    <div>
                        <Button
                            variant="filled"
                            size="md"
                            className={isEditing ? "bg-green-500" : "bg-blue-500"}
                            type="submit"
                        >
                            {isEditing ? "Update" : "Add"}
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </form>
    );
};

export default ToDoInput;
