import React from "react";
import "./index.css";

const Task = ({ name, completed, onDelete }) => {
  return (
    <div className="Task">
      {name}

      {!completed && (
        <button className="TaskButton" onClick={() => onDelete(name)}>
          X
        </button>
      )}
    </div>
  );
};

export default Task;
