import React from "react";
import "./index.css";

const TaskList = ({ title, tasks, noTasksCopy }) => {
  if (tasks.length === 0 && !noTasksCopy) {
    return null;
  }

  return (
    <div className="TaskListWrapper">
      <div className="TaskList">
        <h3>
          {title} ({tasks.length}):
        </h3>
        {tasks.length > 0 ? <ul>{tasks}</ul> : noTasksCopy}
      </div>
    </div>
  );
};

export default TaskList;
