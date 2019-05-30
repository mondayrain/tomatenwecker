import React from "react";
import "./index.css";

import Task from "./task";
import TaskInput from "./task-input";
import TaskList from "./task-list";

const TASKS_TODO_TITLE = "Tasks To Do";
const TASKS_COMPLETED_TITLE = "Previous Tasks";
const NO_TASKS_TODO_COPY = "No tasks to do. Add one!";

const TodoDashboard = ({
  todos,
  completedTodos,
  onTaskAdded,
  onTaskDeleted
}) => {
  const onTodoDeleted = onTaskDeleted("todos");
  const onTodoAdded = onTaskAdded("todos");
  const onCompletedTodoDeleted = onTaskDeleted("completedTodos");
  const onTaskReAdded = taskName => {
    onCompletedTodoDeleted(taskName);
    onTodoAdded(taskName);
  };

  const withDeleteButtonTask = mapDataToTaskComponent("x")(onTodoDeleted);
  const withReAddButtonTask = mapDataToTaskComponent("+")(onTaskReAdded);

  return (
    <div className="TodoDashboard">
      <TaskInput onSubmit={onTodoAdded} />
      <TaskList
        title={TASKS_TODO_TITLE}
        tasks={withDeleteButtonTask(todos)}
        noTasksCopy={NO_TASKS_TODO_COPY}
      />
      <TaskList
        title={TASKS_COMPLETED_TITLE}
        tasks={withReAddButtonTask(completedTodos)}
      />
    </div>
  );
};

const mapDataToTaskComponent = buttonValue => onButtonPressed => tasks =>
  tasks.map((name, index) => (
    <Task
      key={`${index}${name}`}
      name={name}
      taskButtonValue={buttonValue}
      onButtonPressed={onButtonPressed}
    />
  ));

export default TodoDashboard;
