import { configureStore } from '@reduxjs/toolkit';

import vendorIdReducer from '../features/vendor/vendorSlices/vendorIdSlice';
import locationReducer from '../features/vendor/vendorSlices/locationSlice';
import selectedLocationReducer from '../features/vendor/vendorSlices/selectedLocationSlice';
import toggleFormReducer from '../features/vendor/vendorSlices/formHandleSlice';
import selectedConversationReducer from '../features/vendor/vendorSlices/selectedConversationSlice';
import conversationsReducer from '../features/vendor/vendorSlices/conversationsSlice';
import messagesReducer from '../features/vendor/vendorSlices/messagesSlice';

export const store = configureStore({
  reducer: {
    vendorId: vendorIdReducer,
    allLocationsData: locationReducer,
    selectedLocation: selectedLocationReducer,
    toggleForm: toggleFormReducer,
    selectedConversation: selectedConversationReducer,
    conversations: conversationsReducer,
    messages: messagesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
