// src/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import eventSlice from '../features/eventSlice';

// Import your reducers here
// import myReducer from './path/to/myReducer';

const rootReducer = combineReducers({
  events: eventSlice,
});

export default rootReducer;
