import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import countriesReducer from './reducers/countriesSlice';

const store = configureStore({
  reducer: {
    countries: countriesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}),
});

export default store;