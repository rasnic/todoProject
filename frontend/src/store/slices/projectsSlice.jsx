import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state = action.payload;
    },
    updateProject: (state, action) => {
      const { _id } = action.payload;
      const existingProject = state.indexOf((project) => project._id === _id);
      state.splice(existingProject, 1, action.payload);
    },
    addProject: (state, action) => {
      state.push(action.payload);
    },
    removeProject: (state, action) => {
      state = state.filter((project) => project._id !== action.payload);
    }
  },
});

export const { setProjects } = projectsSlice.actions;

export default projectsSlice.reducer;