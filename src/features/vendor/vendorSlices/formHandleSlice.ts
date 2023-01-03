/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: boolean = false;

export const formHandleSlice = createSlice({
  name: 'vendorLocation',
  initialState,
  reducers: {
    toggleForm: (state, action: PayloadAction<boolean>) => {
      return action.payload;
    }
  }
});

export const { toggleForm } = formHandleSlice.actions;

export default formHandleSlice.reducer;
