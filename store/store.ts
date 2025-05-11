import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer from '@/features/notifications/notificationsSlice';
import { entriesApi } from './entries/entriesApi';
import { metricsApi } from './metrics/metricsApi';
export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    [entriesApi.reducerPath]: entriesApi.reducer,
    [metricsApi.reducerPath]: metricsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        entriesApi.middleware,
        metricsApi.middleware
      ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
