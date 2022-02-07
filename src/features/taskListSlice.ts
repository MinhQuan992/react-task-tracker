import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  addTask,
  deleteTask,
  fetchAllTasks,
  fetchOneTask,
  updateTask,
} from "../apis/taskAPIs";
import { TaskObject } from "../App";
import { RootState } from "../app/store";

const taskAdapter = createEntityAdapter<TaskObject>();

const initialState = taskAdapter.getInitialState({
  loading: false,
});

export const getAllTasks = createAsyncThunk(
  "taskList/getAllTasks",
  async () => {
    return await fetchAllTasks();
  }
);

export const getOneTask = createAsyncThunk(
  "taskList/getOneTask",
  async (id: number) => {
    return await fetchOneTask(id);
  }
);

export const addNewTask = createAsyncThunk(
  "taskList/addNewTask",
  async (task: TaskObject) => {
    return await addTask(task);
  }
);

export const changeTaskReminder = createAsyncThunk(
  "taskList/changeTaskReminder",
  async (id: number) => {
    const taskToUpdate = await fetchOneTask(id);
    const updatedTask = { ...taskToUpdate, reminder: !taskToUpdate.reminder };
    return await updateTask(updatedTask);
  }
);

export const deleteOneTask = createAsyncThunk(
  "taskList/deleteOneTask",
  async (id: number) => {
    return await deleteTask(id);
  }
);

export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        taskAdapter.setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        taskAdapter.addOne(state, action.payload);
        state.loading = false;
      })
      .addCase(changeTaskReminder.fulfilled, (state, action) => {
        const newTask = action.payload;
        state.entities[newTask.id] = newTask;
        state.loading = false;
      })
      .addCase(deleteOneTask.fulfilled, (state, action) => {
        taskAdapter.removeOne(state, action.payload);
        state.loading = false;
      });
  },
});

export const { selectAll: selectAllTasks, selectById: selectTaskById } =
  taskAdapter.getSelectors((state: RootState) => state.taskList);

export default taskListSlice.reducer;
