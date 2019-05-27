import React from "react";
import "./index.css";

import Task from "../task";

const NO_TASKS_COPY = "No tasks in your list. Add one!";

const TaskList = ({ todos, completedTodos, onTaskDeleted }) => {
  const todoTasks = todos.map(name => {
    return (
      <Task key={name} name={name} completed={false} onDelete={onTaskDeleted} />
    );
  });

  const completedTodoTasks = completedTodos.map(name => {
    return <Task key={name} name={name} completed={true} />;
  });

  return (
    <div className="TaskListWrapper">
      <div className="TaskList">
        <h3>Tasks To Do ({todos.length}): </h3>
        {todos.length > 0 ? <ul>{todoTasks}</ul> : NO_TASKS_COPY}
      </div>

      {completedTodos.length > 0 ? (
        <div className="TaskList">
          <h3>Past Tasks ({completedTodos.length}):</h3>
          <ul>{completedTodoTasks}</ul>
        </div>
      ) : null}
    </div>
  );
};

export default TaskList;
