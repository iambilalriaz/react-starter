/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ConversationType } from '../../../lib/types';

const initialState: ConversationType[] = [];

export const selectedConversationSlice = createSlice({
  name: 'selectedConversation',
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<ConversationType[]>) => {
      return action?.payload;
    }
  }
});

export const { setConversations } = selectedConversationSlice.actions;

export default selectedConversationSlice.reducer;
