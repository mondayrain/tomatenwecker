//-- STATE HELPERS --
//-------------------

const TASK_SECONDS = 1500;
const REST_SECONDS = 300;
const LONG_REST_SECONDS = 1200;

export const returnDefaultState = () => ({
  todos: [],
  completedTodos: [],
  resting: false,
  time: TASK_SECONDS,
  currentTime: TASK_SECONDS,
  intervalId: null
});

export const returnStartIntervalState = (state, tickTimer) => {
  if (state.intervalId) {
    return {};
  }

  const intervalId = setInterval(tickTimer, 1000);

  return {
    intervalId
  };
};

export const returnClearIntervalState = state => {
  if (!state.intervalId) {
    return {};
  }

  clearInterval(state.intervalId);

  return {
    intervalId: null
  };
};

export const returnResetTimerState = state => ({
  currentTime: state.time
});

export const returnSkipState = state => {
  if (state.resting) {
    return returnCompleteRestState(state);
  } else {
    const finishedTask = state.todos[0];

    return {
      todos: state.todos.slice(1),
      completedTodos: [finishedTask].concat(state.completedTodos)
    };
  }
};

export const returnCompleteState = state => {
  return state.resting
    ? returnCompleteRestState(state)
    : returnCompleteTodoState(state);
};

const returnCompleteRestState = state => {
  if (!state.resting) {
    return {};
  }

  return {
    time: TASK_SECONDS,
    currentTime: TASK_SECONDS,
    resting: !state.resting
  };
};

const returnCompleteTodoState = state => {
  if (state.resting) {
    return {};
  }

  const seconds =
    state.completedTodos.length > 0 && state.completedTodos.length % 4 === 0
      ? LONG_REST_SECONDS
      : REST_SECONDS;

  const finishedTask = state.todos[0];
  return {
    time: seconds,
    currentTime: seconds,
    todos: state.todos.slice(1),
    completedTodos: [finishedTask].concat(state.completedTodos),
    resting: !state.resting
  };
};
