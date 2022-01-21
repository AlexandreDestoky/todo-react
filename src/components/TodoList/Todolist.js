import React, { useRef, useState } from "react";
import Task from "../Task/Task";
import { v4 as uuidv4 } from "uuid";

export default function Todolist() {
  let localeTask = JSON.parse(localStorage.getItem("taskStorage")) || [];
  const [taskList, setTaskList] = useState(localeTask);
  const taskInput = useRef();
  localStorage.setItem("taskStorage", JSON.stringify(taskList));

  const addTask = e => {
    e.preventDefault();
    const taskValue = taskInput.current.value;
    if (taskValue.trim() === "") return;
    setTaskList(prevState => [{ id: uuidv4(), name: taskValue }, ...prevState]);
    taskInput.current.value = "";
  };

  const editTask = (idInput, nameInput) => {
    setTaskList(prevState => {
      let tabTask = [...prevState];
      tabTask.find(el => el.id === idInput).name = nameInput;
      return tabTask;
    });
  };

  const deleteTask = idInput => {
    setTaskList(prevState => {
      let tabTask = [...prevState];
      return tabTask.filter(el => el.id !== idInput);
    });
  };
  return (
    <div>
      <h1>TODOLIST</h1>
      <form onSubmit={addTask}>
        <input type="text" placeholder="Clean my room.." ref={taskInput} required="required" />
        <button>+</button>
      </form>
      <ul>
        {taskList.map(el => (
          <Task key={uuidv4()} {...el} edit={editTask} delete={deleteTask} />
        ))}
      </ul>
    </div>
  );
}
