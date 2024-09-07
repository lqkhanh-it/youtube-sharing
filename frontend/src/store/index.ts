import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import videoReducer from './slices/video.slice';
import userReducer from './slices/user.slice';

export const store = configureStore({
  reducer: {
    video: videoReducer,
    users: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
