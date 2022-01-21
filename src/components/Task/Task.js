import React, { useRef, useState } from "react";
import "./Task.scss";

export default function Task(props) {
  const [isInput, setIsInput] = useState(false);
  const task = useRef();
  const editEnter = (e, id, name) => {
    if (e.key === "Enter") {
      props.edit(id, name);
    }
  };

  if (isInput) {
    return (
      <input
        className="task"
        type="text"
        autoFocus
        defaultValue={props.name}
        onBlur={() => props.edit(props.id, task.current.value)}
        onKeyDown={e => editEnter(e, props.id, task.current.value)}
        ref={task}
      />
    );
  }
  return (
    <li className="task" onDoubleClick={() => setIsInput(true)}>
      <span>{props.name}</span>{" "}
      <span onClick={() => props.delete(props.id)} className="cross">
        ❌
      </span>
    </li>
  );
}
