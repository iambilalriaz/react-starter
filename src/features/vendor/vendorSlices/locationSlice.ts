/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ILocationInterface } from '../../../lib/types';

const initialState: ILocationInterface[] = [];

export const locationSlice = createSlice({
  name: 'vendorLocation',
  initialState,
  reducers: {
    getAllLocationsData: (state, action: PayloadAction<ILocationInterface[]>) => {
      return [...state, ...action.payload];
    }
  }
});

export const { getAllLocationsData } = locationSlice.actions;

export default locationSlice.reducer;
