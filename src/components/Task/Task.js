import React, { useRef, useState } from "react";

export default function Task(props) {
  const [isInput, setIsInput] = useState(false);
  const task = useRef();
  const editEnter = (e,id, name) =>  {
    if(e.key === "Enter") {
      props.edit(id, name)
    }
  }

  if (isInput) {
    return (
      <input
        type="text"
        autoFocus
        defaultValue={props.name}
        onBlur={() => props.edit(props.id, task.current.value)}
        onKeyDown={(e)=> editEnter(e,props.id, task.current.value)}
        ref={task}
      />
    );
  }
  return <li onDoubleClick={() => setIsInput(true)}>{props.name} <span onClick={() => props.delete(props.id)}>❌</span></li>;
}
