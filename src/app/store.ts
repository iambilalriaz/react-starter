import { configureStore } from '@reduxjs/toolkit';

import vendorIdReducer from '../features/vendor/vendorSlices/vendorIdSlice';

export const store = configureStore({
  reducer: { vendorId: vendorIdReducer }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
