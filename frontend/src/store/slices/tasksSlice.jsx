import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      return action.payload;
    },
    removeTask: (state, action) => {
      state = state.filter((task) => task._id !== action.payload);
    },
    addTask: (state, action) => {
      state.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.findIndex((task) => task._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { setTasks, removeTask, addTask, updateTask } = tasksSlice.actions;
export const getTasks = (state) => state.tasks;
export default tasksSlice.reducer;
