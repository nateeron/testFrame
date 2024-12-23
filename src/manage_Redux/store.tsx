import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer'; // Your root reducer
import { thunk } from 'redux-thunk'; // Correct way to import redux-thunk
import { createLogger } from 'redux-logger'; // Import logger

// Create a logger middleware
const logger = createLogger();

// Create a middleware array with thunk and logger
const middlewares = [thunk, logger];

// Create the Redux store
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;













