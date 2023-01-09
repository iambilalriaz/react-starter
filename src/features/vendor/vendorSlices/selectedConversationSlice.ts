/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = { id: '', name: '' };

export const selectedConversationSlice = createSlice({
  name: 'selectedConversation',
  initialState,
  reducers: {
    setSelectedConversation: (state, action: PayloadAction<{ id: string; name: string }>) => {
      return action?.payload;
    }
  }
});

export const { setSelectedConversation } = selectedConversationSlice.actions;

export default selectedConversationSlice.reducer;
