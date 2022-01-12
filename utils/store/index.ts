import { configureStore } from '@reduxjs/toolkit';
import activeWindowReducer from './features/activeWindowSlice';
import walletReducer from './features/walletSlice';
import scrollToSectionReducer from './features/scrollToSectionSlice';

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    activeWindow: activeWindowReducer,
    scrollToSection: scrollToSectionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
