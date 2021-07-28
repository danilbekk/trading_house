import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import clientsReducer from './features/clients';
import statusesReducer from './features/statuses';
import notesReducer from './features/notes';

const logger = createLogger({
  diff: true,
  collapsed: true,
});

export const store = createStore(
  combineReducers({
    clients: clientsReducer,
    statuses: statusesReducer,
    notes: notesReducer,
  }),
  applyMiddleware(thunk, logger)
);
