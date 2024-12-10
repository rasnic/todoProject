import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action) => {
      return action.payload;
    },
    addProject: (state, action) => {
      state.push(action.payload);
    },
    removeProject: (state, action) => {
      state.filter((project) => project._id !== action.payload);
    },
  },
});

export const getProjects = (state) => state.projects;

export const { setProjects, updateProject, addProject, removeProject } =
  projectsSlice.actions;

export default projectsSlice.reducer;
