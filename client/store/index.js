import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import spaceship from './spaceship';
import spaceships from './spaceships';

const reducer = combineReducers({ user, spaceships, spaceship })
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
