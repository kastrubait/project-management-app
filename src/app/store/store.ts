import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './reducers/HeaderSlice';
import bodyReducer from './reducers/BodySlice';

export const store = configureStore({
  reducer: {
    header: headerReducer,
    body: bodyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
