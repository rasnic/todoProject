import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state = action.payload;
    },
    removeTask: (state, action) => {
      state = state.filter((task) => task._id !== action.payload);
    },
    addTask: (state, action) => {
      state.push(action.payload);
    },
    updateTask: (state, action) => {
      const { _id } = action.payload;
      const existingTask = state.indexOf((task) => task._id === _id);
      state.splice(existingTask, 1, action.payload);
    },
  },
});

export const { setTasks, removeTask, addTask, updateTask } = tasksSlice.actions;

export default tasksSlice.reducer;