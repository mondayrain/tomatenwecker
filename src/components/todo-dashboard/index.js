import React from "react";
import "./index.css";

import TaskInput from "./task-input";
import TaskList from "./task-list";

const TodoDashboard = ({
  todos,
  completedTodos,
  onTaskAdded,
  onTaskDeleted
}) => {
  return (
    <div className="TodoDashboard">
      <TaskInput onSubmit={onTaskAdded} />
      <TaskList
        todos={todos}
        completedTodos={completedTodos}
        onTaskDeleted={onTaskDeleted}
      />
    </div>
  );
};

export default TodoDashboard;
