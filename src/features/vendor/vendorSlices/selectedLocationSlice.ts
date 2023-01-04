/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ILocationInterface } from '../../../lib/types';

const initialState: ILocationInterface = {
  id: '',
  address1: '',
  address2: '',
  city: '',
  country: '',
  state: '',
  zip: '',
  hoursOfOperation: ['', '']
};

export const getSelectedLocationSlice = createSlice({
  name: 'vendorLocation',
  initialState,
  reducers: {
    getSelectedLocation: (state, action: PayloadAction<ILocationInterface>) => {
      return { ...state, ...action?.payload };
    }
  }
});

export const { getSelectedLocation } = getSelectedLocationSlice.actions;

export default getSelectedLocationSlice.reducer;
