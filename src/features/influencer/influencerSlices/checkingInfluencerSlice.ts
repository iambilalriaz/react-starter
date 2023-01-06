/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = true;

export const checkingInfluencerSlice = createSlice({
  name: 'checkingInfluencer',
  initialState,
  reducers: {
    setCheckingInfluencer: (state, action: PayloadAction<boolean>) => {
      return action?.payload;
    }
  }
});

export const { setCheckingInfluencer } = checkingInfluencerSlice.actions;

export default checkingInfluencerSlice.reducer;
