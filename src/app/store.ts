import { configureStore } from '@reduxjs/toolkit';

import vendorIdReducer from '../features/vendor/vendorSlices/vendorIdSlice';
import locationReducer from '../features/vendor/vendorSlices/locationSlice';

export const store = configureStore({
  reducer: { vendorId: vendorIdReducer, allLocationsData: locationReducer }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
