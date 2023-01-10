/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = '';

export const selectedSidebarItemSlice = createSlice({
  name: 'selectedSidebarItem',
  initialState,
  reducers: {
    setSelectedSidebarItem: (state, action: PayloadAction<string>) => {
      return action?.payload;
    }
  }
});

export const { setSelectedSidebarItem } = selectedSidebarItemSlice.actions;

export default selectedSidebarItemSlice.reducer;
