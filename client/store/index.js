
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import cart from './cart';
import guestCart from './guestCart';
import spaceship from './spaceship';
import spaceships from './spaceships';
import reviews from './review';

const reducer = combineReducers({ user, cart, spaceships, spaceship, reviews })
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware)

export default store

export * from './user'
export * from './cart'
export * from './spaceships'
export * from './spaceship'
export * from './review'
