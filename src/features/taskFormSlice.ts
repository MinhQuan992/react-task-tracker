import { createSlice } from "@reduxjs/toolkit";

interface TaskFormState {
  isShowed: boolean;
}

const initialState: TaskFormState = {
  isShowed: false,
};

export const taskFormSlice = createSlice({
  name: "taskForm",
  initialState,
  reducers: {
    changeState: (state) => {
      state.isShowed = !state.isShowed;
    },
  },
});

export const { changeState } = taskFormSlice.actions;
export default taskFormSlice.reducer;
