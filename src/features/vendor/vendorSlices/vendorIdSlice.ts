/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  value: string;
}

const initialState: CounterState = {
  value: ''
};

export const vendorIdSlice = createSlice({
  name: 'vendorId',
  initialState,
  reducers: {
    getVendorId: (state, action: PayloadAction<string>) => {
      state.value += action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { getVendorId } = vendorIdSlice.actions;

export default vendorIdSlice.reducer;
