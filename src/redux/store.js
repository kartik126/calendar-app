import { configureStore } from '@reduxjs/toolkit';
import eventsReducer, { eventsMiddleware } from '../features/eventSlice';

const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(eventsMiddleware),
});

export default store;
