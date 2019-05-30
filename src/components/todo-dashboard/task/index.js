import React from "react";
import "./index.css";

const Task = ({ name, taskButtonValue, onButtonPressed }) => {
  return (
    <div className="Task">
      {name}

      <button className="TaskButton" onClick={() => onButtonPressed(name)}>
        {taskButtonValue}
      </button>
    </div>
  );
};

export default Task;
