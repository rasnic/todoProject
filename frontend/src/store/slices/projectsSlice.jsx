import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action) => {
      return action.payload;
    },
    updateProject: (state, action) => {
      const { _id } = action.payload;
      const existingProject = state.indexOf((project) => project._id === _id);
      return state.splice(existingProject, 1, action.payload);
    },
    addProject: (state, action) => {
      return state.push(action.payload);
    },
    removeProject: (state, action) => {
      return state.filter((project) => project._id !== action.payload);
    },
  },
});

export const { setProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
