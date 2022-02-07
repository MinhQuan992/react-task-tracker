import { configureStore } from "@reduxjs/toolkit";

import taskFormReducer from "../features/taskFormSlice";
import taskListReducer from "../features/taskListSlice";

export const store = configureStore({
  reducer: {
    taskForm: taskFormReducer,
    taskList: taskListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
