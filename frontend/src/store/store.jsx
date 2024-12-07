import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';
import usersReducer from './slices/usersSlice';
import projectsReducer from './slices/projectsSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
    projects: projectsReducer,
  },
});

export default store;
