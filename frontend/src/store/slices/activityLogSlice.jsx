import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const activityLogSlice = createSlice({
  name: 'activityLog',
  initialState,
  reducers: {
    setActivityLog: (state, action) => {
      return action.payload;
    },
    addActivityLog: (state, action) => {
      return state.push(action.payload);
    },
  },
});

export const { setActivityLog } = activityLogSlice.actions;

export default activityLogSlice.reducer;
