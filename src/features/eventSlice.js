import { createSlice } from '@reduxjs/toolkit';

// Load events from localStorage
const loadEventsFromLocalStorage = () => {
  try {
    const storedEvents = localStorage.getItem('events');
    return storedEvents ? JSON.parse(storedEvents) : [];
  } catch (error) {
    console.error('Error loading events from localStorage:', error);
    return [];
  }
};

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    data: loadEventsFromLocalStorage(),
  },
  reducers: {
    addEvent: (state, action) => {
      state.data.push(action.payload);
    },
    removeEvent: (state, action) => {
      state.data = state.data.filter((event) => event.id !== action.payload.id);
    },
    updateEvent: (state, action) => {
      const index = state.data.findIndex((event) => event.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
  },
});

export const { addEvent, removeEvent, updateEvent } = eventsSlice.actions;

// Update localStorage whenever the state changes
export const eventsMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  // Save the events to localStorage after each action
  localStorage.setItem('events', JSON.stringify(store.getState().events.data));
  return result;
};

export default eventsSlice.reducer;
