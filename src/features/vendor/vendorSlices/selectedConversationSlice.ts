/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ConversationType } from '../../../lib/types';

const initialState: ConversationType = {
  influencerId: '',
  userName: '',
  lastMessageTimestamp: '',
  lastMessageText: '',
  sentByVendor: false
};

export const selectedConversationSlice = createSlice({
  name: 'selectedConversation',
  initialState,
  reducers: {
    setSelectedConversation: (state, action: PayloadAction<ConversationType>) => {
      return action?.payload;
    }
  }
});

export const { setSelectedConversation } = selectedConversationSlice.actions;

export default selectedConversationSlice.reducer;
