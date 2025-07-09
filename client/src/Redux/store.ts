import { configureStore } from "@reduxjs/toolkit";
import authSlice  from "./Slices/authSlice";
import messageSlice from "./Slices/messageSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    message: messageSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;