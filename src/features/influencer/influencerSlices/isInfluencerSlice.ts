/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = false;

export const isInfluencerSlice = createSlice({
  name: 'isInfluencer',
  initialState,
  reducers: {
    setIsInfluencer: (state, action: PayloadAction<boolean>) => {
      return action?.payload;
    }
  }
});

export const { setIsInfluencer } = isInfluencerSlice.actions;

export default isInfluencerSlice.reducer;
