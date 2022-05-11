import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import recorderReducer from './recorder-reducer';
import speechReducer from './speech-reducer';

export const store = configureStore({
  reducer: {
    recorder: recorderReducer,
    speech: speechReducer
  },
  middleware: [thunkMiddleware]
});
