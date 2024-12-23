import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer'; // Root reducer

// Logger middleware
const logger = createLogger();

// Combine middlewares
const middlewares = [thunk, logger];

// Create store with root reducer and middlewares
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
