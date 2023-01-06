/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MessageType } from '../../../lib/types';

const initialState: MessageType[] = [];

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<MessageType[]>) => {
      return action?.payload;
    }
  }
});

export const { setMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
