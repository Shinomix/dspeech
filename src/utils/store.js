import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import recorderReducer from './recorder-reducer';
import speechReducer from './speech-reducer';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    recorder: recorderReducer,
    speech: speechReducer
  },
  middleware: [sagaMiddleware]
});
